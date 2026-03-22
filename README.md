# Theme Organizer Resource

A browsable, filterable theme gallery and comparison tool for selecting and evaluating color themes across DaveHomeAssist projects. Hosted on GitHub Pages.

**Live:** https://davehomeassist.github.io/theme-organizer-resource/

## What it does

- Browse 59 themes organized by family (gallery, project-derived, user imports)
- Filter by mood, family, status, tags, and free-text search
- Compare up to 4 themes side-by-side in the comparison tray
- Inspect typography, color tokens, and usage recommendations per theme
- Shortlist favorites and export/import state as JSON
- Persist selections and UI state to localStorage

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main application (single-file, self-contained) |
| `THEMES_THEME_ORGANIZER_VISUAL_SPEC.md` | Visual design specification (palette, typography, spacing, components) |
| `archive/` | Original source gallery pages (v1 reference) |

## Theme JSON Schema

Each theme in `THEME_DATA` follows this shape:

```json
{
  "id": "t1",
  "code": "t1",
  "name": "Instrument Grade",
  "description": "Deep violet · indigo-black · cold cyan.",
  "tags": ["dark", "futuristic", "tech", "purple", "cold", "minimal"],
  "family": "Product / System UI",
  "bestFor": ["dashboard", "developer-tool", "precision-ui"]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. Prefixes: `t` = gallery, `p` = project-derived, `u` = user import |
| `code` | `string` | Short code for display and export |
| `name` | `string` | Human-readable theme name |
| `description` | `string` | One-line color description using `·` separator |
| `tags` | `string[]` | Filterable tags (mood, temperature, style, density) |
| `family` | `string` | Grouping family for the gallery view |
| `bestFor` | `string[]` | Recommended use cases |

### Extended fields (per-theme, set via inspector)

These are stored in localStorage state, not in `THEME_DATA`:

| Field | Type | Description |
|-------|------|-------------|
| `typography` | `string` | Font stack (e.g. `"Fraunces + DM Mono"`) |
| `note` | `string` | User annotation |
| `status` | `string` | One of: `untouched`, `maybe`, `shortlisted`, `rejected` |

### ID prefixes

| Prefix | Range | Source |
|--------|-------|--------|
| `t` | `t1`–`t30` | Gallery themes (curated set) |
| `p` | `p1`–`p8` | Project-derived themes (pulled from active repos) |
| `u` | `u5`–`u24` | User-imported themes |

### Theme families

| Family | Description |
|--------|-------------|
| Product / System UI | Utility-led themes for interfaces, dashboards, tools |
| Editorial / Reading-first | Typography-led themes for reading and publishing |
| Brutalist / Experimental | High-contrast or concept-heavy themes with deliberate friction |
| Nature / Organic / Wellness | Biophilic, calm, tactile themes for hospitality and wellness |
| Heritage / Cultural Reference | Historically or culturally anchored themes |
| Luxury / Glass / Premium | Polished, premium themes for finance and boutique brands |
| Color Systems / Maximalist Pop | Chroma-first, high-energy themes for campaigns and music |
| Project-Derived / House Systems | Themes pulled from active DaveHomeAssist projects |
| Minimal / Clean / Neutral | Quiet, airy systems for portfolio and general-purpose surfaces |
| Dark / Professional / Editorial | Controlled dark themes for polished presentation |
| Dark / Cyber / Expressive | Neon, nightlife, and future-leaning themes |
| Dark / Luxury / Premium | Heavy, polished dark systems for fashion and editorial |
| Soft / Pastel / Creative | Lighter, friendlier systems for boutique and creative brands |
| Dark / Tech / Data | Technical dark systems for analytics and developer tools |
| Industrial / Craft / Bold | Warm, material-heavy systems for maker brands |
| Coastal / Fresh / Airy | Open, breathable systems for travel and wellness |
| Classic / Luxury / Heritage | Traditional high-trust light systems for heritage brands |

### Project-derived themes

| ID | Name | Project |
|----|------|---------|
| `p1` | Garden OS | garden-os |
| `p2` | Trailkeeper Field Log | trailkeeper |
| `p3` | Prompt Lab Core | prompt-lab |
| `p4` | Estate II Halloween | estate-ii-deploy |
| `p5` | Park Rave Flyer | park-rave-005 |
| `p6` | Dave HomeAssist | DaveHomeAssist.github.io |
| `p7` | Festival Atlas Routeboard | festival-atlas |
| `p8` | MetaGrid Signal | metagrid |

## State persistence

State is stored in `localStorage` under key `theme-organizer-state-v1`:

```json
{
  "selectedId": "t27",
  "compareIds": ["t1", "t5"],
  "collapsedFamilies": {},
  "previewCopy": {},
  "ui": {
    "groupMode": true,
    "shortlistOnly": false,
    "viewMode": "selection"
  }
}
```

Export and import buttons in the toolbar allow full state portability as JSON files.

## Stack

- Vanilla HTML/CSS/JS (single file, no build step)
- Google Fonts (Inter, Italiana, VT323, Cinzel, and 20+ theme-specific families)
- GitHub Pages deployment
- localStorage for persistence
