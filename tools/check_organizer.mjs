// Browser checks for import safety, poisoned storage, workspace actions, and keyboard focus.
// Run from the repo root while a static server is available:
//   node tools/check_organizer.mjs http://127.0.0.1:8765
import puppeteer from 'puppeteer-core';

const base = process.argv[2] || 'http://127.0.0.1:8765';
const chrome = process.env.CHROME_PATH || '/usr/local/bin/google-chrome';
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu']
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push(String(err)));
await page.goto(base, { waitUntil: 'networkidle0' });
await page.waitForSelector('#groups .card');

async function importJson(payload) {
  await page.evaluate(async (text) => {
    const file = new File([text], 'state.json', { type: 'application/json' });
    const input = document.getElementById('importFile');
    const list = new DataTransfer();
    list.items.add(file);
    input.files = list.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, JSON.stringify(payload));
  await page.waitForFunction(() => {
    const toast = document.getElementById('toast');
    return toast && !toast.hidden && toast.textContent;
  }, { timeout: 3000 });
}

const malicious = {
  themes: [{
    id: 't1',
    status: 'x" onmouseover="window.__xss=1',
    note: 12,
    project: { bad: true }
  }]
};
await importJson(malicious);
const rejected = await page.evaluate(() => ({
  xss: window.__xss || null,
  html: document.body.innerHTML.includes('onmouseover'),
  toast: document.getElementById('toast')?.textContent || '',
  status: document.querySelector('[data-theme-id="t1"] .status-pill')?.textContent || '',
  cards: document.querySelectorAll('#groups .card').length
}));
if (rejected.xss || rejected.html) throw new Error('import injected markup');
if (!rejected.toast.toLowerCase().includes('could not import')) throw new Error('bad import was not rejected: ' + rejected.toast);
if (rejected.cards < 58) throw new Error('page lost its cards');

await page.evaluate(() => {
  localStorage.setItem('theme-organizer-state-v1', JSON.stringify({
    selectedId: { bad: true },
    compareIds: { includes() { throw new Error('boom'); } },
    t1: { status: 'nope" onclick="1', note: 4, project: ['x'] },
    ui: { viewMode: 'not-a-mode' }
  }));
});
await page.reload({ waitUntil: 'networkidle0' });
await page.waitForSelector('#groups .card');
const recovered = await page.evaluate(() => ({
  cards: document.querySelectorAll('#groups .card').length,
  visible: getComputedStyle(document.body).visibility,
  status: document.querySelector('[data-theme-id="t1"] .status-pill')?.className || ''
}));
if (recovered.cards < 58 || recovered.visible !== 'visible') throw new Error('poisoned storage did not recover');
if (recovered.status.includes('onclick') || recovered.status.includes('nope')) throw new Error('bad status reached the DOM');

await page.evaluate(() => {
  const card = document.querySelector('#groups .card[data-theme-id="t2"] [data-action="shortlist"]');
  card.click();
});
await page.waitForSelector('#workspacePanel .card');
const workspace = await page.evaluate(() => {
  const button = document.querySelector('#workspacePanel [data-action="compare"]');
  button.click();
  return {
    label: document.querySelector('#workspacePanel [data-action="compare"]')?.textContent || '',
    compare: !document.getElementById('comparePanel').hidden
  };
});
if (!workspace.compare || !workspace.label.includes('Compare')) throw new Error('workspace button did nothing');

const focus = await page.evaluate(() => {
  const visible = [...document.querySelectorAll('#groups .card')].filter(card => card.offsetParent !== null);
  visible[0].focus();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
  const active = document.activeElement;
  return {
    tag: active?.tagName || '',
    hidden: active?.closest('.group.collapsed') != null,
    id: active?.dataset?.themeId || ''
  };
});
if (focus.tag !== 'ARTICLE' || focus.hidden || !focus.id) throw new Error('keyboard focus left the visible grid: ' + JSON.stringify(focus));

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok', { rejected: rejected.toast, recovered: recovered.status, workspace: workspace.label, focus: focus.id });
await browser.close();
