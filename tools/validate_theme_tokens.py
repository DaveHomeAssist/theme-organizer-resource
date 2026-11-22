#!/usr/bin/env python3
"""Check data/theme-tokens.json against THEME_DATA in index.html.

Required keys are bg, surface, text, and accent. muted and accent2 are
optional. Every color is a lowercase #rrggbb. Text must clear 4.5:1 on bg
and surface. Accent must clear 4.5:1 against either text or bg. Muted, when
present, must clear 3:1 on bg.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEX = re.compile(r'^#[0-9a-f]{6}$')
REQUIRED = ('bg', 'surface', 'text', 'accent')
OPTIONAL = ('muted', 'accent2')


def luminance(hex_color):
    channels = [int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def contrast(a, b):
    hi, lo = sorted((luminance(a), luminance(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def theme_ids(html):
    block = html.split('const THEME_DATA', 1)[1].split('const STORAGE_KEY', 1)[0]
    return re.findall(r"\bid:'([^']+)'", block)


def main():
    html = (ROOT / 'index.html').read_text()
    tokens = json.loads((ROOT / 'data' / 'theme-tokens.json').read_text())
    ids = theme_ids(html)
    failures = []
    if len(ids) != len(set(ids)):
        failures.append('duplicate theme ids')
    missing = sorted(set(ids) - set(tokens))
    extra = sorted(set(tokens) - set(ids))
    if missing:
        failures.append(f'missing token entries: {", ".join(missing)}')
    if extra:
        failures.append(f'unknown token ids: {", ".join(extra)}')
    for theme_id, entry in tokens.items():
        if not isinstance(entry, dict):
            failures.append(f'{theme_id} is not an object')
            continue
        unknown = set(entry) - set(REQUIRED) - set(OPTIONAL)
        if unknown:
            failures.append(f'{theme_id} unknown keys {sorted(unknown)}')
        if not set(REQUIRED) <= set(entry):
            failures.append(f'{theme_id} missing required keys')
            continue
        for key, value in entry.items():
            if not isinstance(value, str) or not HEX.match(value):
                failures.append(f'{theme_id} {key} is not lowercase hex')
        if any(f.startswith(theme_id) for f in failures):
            continue
        if contrast(entry['text'], entry['bg']) < 4.5:
            failures.append(f'{theme_id} text/bg {contrast(entry["text"], entry["bg"]):.2f}')
        if contrast(entry['text'], entry['surface']) < 4.5:
            failures.append(f'{theme_id} text/surface {contrast(entry["text"], entry["surface"]):.2f}')
        accent_ok = max(contrast(entry['accent'], entry['text']), contrast(entry['accent'], entry['bg'])) >= 4.5
        if not accent_ok:
            failures.append(f'{theme_id} accent vs text|bg')
        if 'muted' in entry and contrast(entry['muted'], entry['bg']) < 3:
            failures.append(f'{theme_id} muted/bg {contrast(entry["muted"], entry["bg"]):.2f}')
    print(f'THEME_DATA {len(ids)}  tokens {len(tokens)}')
    if failures:
        print('FAIL')
        print('\n'.join(failures))
        return 1
    print('ALL PASS')
    return 0


if __name__ == '__main__':
    sys.exit(main())
