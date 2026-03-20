# Theme Organizer Visual Spec

## Design Direction

The current organizer already has the right product shape: dark workspace, grouped theme families, dense-but-structured cards, sticky inspector, and a comparison tray. The next visual pass should make it feel less like a developer utility and more like a deliberate selection instrument.

Direction:
- Quiet dark canvas with higher hierarchy separation between controls, content groups, and inspector
- Lower chip noise and stronger preview presence
- More readable typography at medium and small sizes
- Softer but clearer distinction between metadata, actions, and decisions
- Preserve the existing semantic structure and content exactly

Visual posture:
- editorial precision over gamer UI
- premium tool, not neon dashboard
- dense, but breathable

---

## Color Palette

### Core Tokens

```css
:root {
  --bg-app: #0c0f14;
  --bg-canvas: #11151d;
  --bg-surface: #171c25;
  --bg-surface-raised: #1d2430;
  --bg-surface-soft: #131821;

  --border-subtle: #273140;
  --border-strong: #344155;
  --border-accent: #6f5ef8;

  --text-primary: #eef3f9;
  --text-secondary: #b6c1d1;
  --text-muted: #8c98ab;
  --text-inverse: #0a0e14;

  --accent-primary: #8b5cf6;
  --accent-primary-hover: #7c4df0;
  --accent-secondary: #22c55e;
  --accent-secondary-soft: rgba(34, 197, 94, 0.14);

  --status-warning: #f59e0b;
  --status-warning-soft: rgba(245, 158, 11, 0.14);
  --status-danger: #ef4444;
  --status-danger-soft: rgba(239, 68, 68, 0.14);

  --focus-ring: #a78bfa;
  --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.24);
  --shadow-panel: 0 16px 36px rgba(0, 0, 0, 0.28);
}
```

### Usage Rules

- `--bg-app`: page background only
- `--bg-canvas`: sticky toolbar and large framing areas
- `--bg-surface`: cards, panels, group blocks
- `--bg-surface-raised`: hover state, selected control backgrounds, raised panels
- `--bg-surface-soft`: inner surfaces such as pills, inline cards, preview frames
- `--border-subtle`: default borders
- `--border-strong`: selected and active surfaces
- `--accent-primary`: selected card outline, active controls, focused group controls
- `--accent-secondary`: positive states like shortlist
- `--status-warning`: maybe / caution states
- `--status-danger`: archived / destructive / warning states

### Status Treatments

```css
.status-unreviewed {
  background: rgba(255,255,255,0.03);
  color: var(--text-muted);
  border-color: var(--border-subtle);
}

.status-shortlist {
  background: var(--accent-secondary-soft);
  color: #aef1c0;
  border-color: rgba(34, 197, 94, 0.28);
}

.status-maybe {
  background: var(--status-warning-soft);
  color: #ffd695;
  border-color: rgba(245, 158, 11, 0.26);
}

.status-archive {
  background: var(--status-danger-soft);
  color: #ffb4b4;
  border-color: rgba(239, 68, 68, 0.26);
}
```

---

## Typography

### Font System

Use:

```css
--font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-editorial: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Rules:
- Use `--font-ui` for all interface chrome, controls, and data labels
- Reserve `--font-editorial` only for theme previews that need reading/editorial flavor
- Use `--font-mono` for theme codes and machine-like metadata only

### Scale

```css
--text-2xs: 11px;
--text-xs: 12px;
--text-sm: 13px;
--text-md: 14px;
--text-lg: 16px;
--text-xl: 20px;
--text-2xl: 28px;
```

### Heading Rules

```css
h1 {
  font: 700 var(--text-2xl)/1.05 var(--font-ui);
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

h2 {
  font: 650 var(--text-lg)/1.1 var(--font-ui);
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

h3 {
  font: 650 18px/1.15 var(--font-ui);
  letter-spacing: -0.02em;
}

h4, h5, h6 {
  font: 600 var(--text-sm)/1.2 var(--font-ui);
  letter-spacing: -0.01em;
}
```

### Body and Supporting Text

```css
body {
  font: 400 var(--text-md)/1.55 var(--font-ui);
  color: var(--text-primary);
}

p,
li,
td,
th,
label,
input,
select,
textarea,
button {
  font-size: var(--text-sm);
}

.supporting-copy,
.group-header p,
.desc,
.footer-note {
  color: var(--text-secondary);
  line-height: 1.5;
}

.code {
  font: 500 11px/1.2 var(--font-mono);
  color: var(--text-muted);
}
```

### Lists

```css
ul, ol {
  margin: 0 0 0 1.1rem;
  padding: 0;
  line-height: 1.6;
}

li + li {
  margin-top: 0.25rem;
}
```

### Tables

If tables are added later for export/import or compare detail:

```css
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-surface);
}

th {
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-strong);
}

td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}

tr:nth-child(even) td {
  background: rgba(255,255,255,0.015);
}
```

---

## Spacing & Layout

### Page Framing

```css
.app {
  max-width: 1560px;
  margin: 0 auto;
  padding: 20px 24px 40px;
}
```

### Rhythm

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 32px;
```

Use:
- `8px` inside pills/chips
- `12px` between tightly related metadata
- `16px` card padding minimum
- `20px` panel padding
- `24px` section breaks between major blocks
- `32px` between page-level regions where needed

### Layout Recommendations

- Keep the current two-column layout, but give the right rail a slightly stronger boundary:

```css
.layout {
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 18px;
}

.detail {
  background: linear-gradient(180deg, var(--bg-surface), #141923);
  box-shadow: var(--shadow-panel);
}
```

- Toolbar should read as a distinct operating layer:

```css
.toolbar {
  background: rgba(12, 15, 20, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
```

---

## Callouts

The current page does not use formal callouts, but it should if you add onboarding or guidance.

### 1. Summary Callout

Use for orientation and “how to use this tool”.

```css
.callout-summary {
  background: linear-gradient(180deg, rgba(139,92,246,0.08), rgba(139,92,246,0.03));
  border: 1px solid rgba(139,92,246,0.20);
  border-left: 4px solid var(--accent-primary);
  border-radius: 16px;
  padding: 16px 18px;
}
```

### 2. Recommendation Callout

Use for “best next move” or “top shortlisted themes”.

```css
.callout-action {
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.20);
  border-left: 4px solid var(--accent-secondary);
  border-radius: 16px;
  padding: 16px 18px;
}
```

### 3. Risk / Caution Callout

Use for archive, caution, or “theme mismatch” guidance.

```css
.callout-warning {
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.20);
  border-left: 4px solid var(--status-warning);
  border-radius: 16px;
  padding: 16px 18px;
}
```

Callout heading style:

```css
.callout-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
```

---

## Dividers & Section Breaks

### Major Section Separation

Use subtle section dividers instead of harsh boxed repetition.

```css
.group + .group {
  margin-top: 2px;
}

.group {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
}
```

### Horizontal Dividers

```css
.section-divider {
  height: 1px;
  margin: 20px 0;
  background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
}
```

### Section Header Treatment

Group headers should feel lighter and more refined:

```css
.group-header {
  background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01));
}

.group-header h2 {
  margin-bottom: 2px;
}
```

---

## Lists & Tables

### Lists

If explanatory content is added:
- Use `disc` for generic lists
- Use numeric lists only for sequences or workflows
- Keep list spacing tighter than paragraph spacing

```css
.content-list {
  padding-left: 1.1rem;
}

.content-list li::marker {
  color: var(--accent-primary);
}
```

### Compare Tray as Table-Like Surface

The compare tray already acts like a table. Tighten it visually:

```css
.compare-grid {
  border-top: 1px solid rgba(255,255,255,0.04);
}

.compare-label {
  background: #151b24;
  color: var(--text-secondary);
}

.compare-cell {
  background: rgba(255,255,255,0.01);
}
```

Add zebra emphasis for dense compare rows:

```css
.compare-grid > :nth-child(4n + 1),
.compare-grid > :nth-child(4n + 2),
.compare-grid > :nth-child(4n + 3),
.compare-grid > :nth-child(4n + 4) {
  background: rgba(255,255,255,0.012);
}
```

---

## Component Rules

### Buttons

The current buttons are structurally right but visually too uniform.

Use 3 button tiers:

```css
.btn-primary {
  background: var(--accent-primary);
  color: white;
  border: 1px solid transparent;
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
}
```

Action mapping:
- `Inspect`, `Open`, `Apply`: primary or strong secondary
- `Shortlist`, `Maybe`: secondary
- `Compare`, `Archive`, `Clear Filters`: ghost

### Cards

Cards need slightly stronger content hierarchy:

```css
.card {
  background: linear-gradient(180deg, #10151d, #0d1219);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
}

.card:hover {
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.card.active {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 1px rgba(139,92,246,0.25), var(--shadow-soft);
}
```

### Pills and Metadata

Current chips are useful but too dominant. Reduce visual weight:

```css
.tag,
.meta-pill {
  background: rgba(255,255,255,0.02);
  color: var(--text-muted);
  border-color: rgba(255,255,255,0.06);
}

.meta-pill {
  color: #cbbfff;
  background: rgba(139,92,246,0.08);
}
```

### Preview Tiles

The new preview tiles should be the visual anchor.

```css
.preview {
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}

.preview-title {
  text-wrap: balance;
}
```

### Inspector

Make the inspector read like an editorial side panel:

```css
.detail {
  border: 1px solid var(--border-strong);
}

.detail-box {
  background: rgba(255,255,255,0.015);
  border-color: rgba(255,255,255,0.06);
}
```

### Inputs

```css
input,
select,
textarea {
  background: #121823;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
}
```

---

## Accessibility Notes

- Maintain at least AA contrast for all body and control text
- Do not reduce muted text below current effective legibility
- Keep visible focus rings on every interactive element
- Increase small-label contrast slightly; current muted text can remain subtle but should not fade
- Preserve button hit targets at `40px` minimum height
- Do not rely on color alone for status; keep text labels like `Unreviewed`, `Shortlisted`, `Maybe`, `Archived`

Suggested focus treatment:

```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

---

## Implementation Notes

### Highest-Value Immediate Changes

1. Reduce chip weight and increase description contrast
2. Give the right inspector stronger raised-panel treatment
3. Refine toolbar with blur + bottom separator
4. Differentiate button tiers instead of styling all actions almost the same
5. Improve compare-grid row shading for easier scanning

### Low-Risk CSS Refactor Strategy

- Introduce new semantic tokens first
- Keep existing structure and class names
- Retheme by replacing color literals with tokens
- Adjust type scale and spacing second
- Then tune component surfaces one by one:
  - toolbar
  - group header
  - cards
  - preview tiles
  - inspector
  - compare tray

### Do Not Change

- content wording
- existing information architecture
- grouping logic
- card semantics
- data model
- preview logic or comparison behavior

This is a visual system pass only.
