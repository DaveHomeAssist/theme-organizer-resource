# Naming and Franchise Structure

## Hierarchy

| Layer | Name | Role |
|-------|------|------|
| Universe | **Garden OS** | Umbrella project / platform / brand |
| Mode 1 | **Story Mode** | Existing 12-chapter narrative sim |
| Mode 2 | **Let It Grow** | Open-world sandbox expansion |

## How They Relate

```
Garden OS
├── Story Mode    → structured, chapter-based, turn-based
├── Let It Grow   → open-world, free-roam, real-time option
└── (future modes) → multiplayer, creative, challenge, etc.
```

## Naming Rules

- **Garden OS** always appears as the parent brand
- **Story Mode** is a mode, not a separate product
- **Let It Grow** is a mode/expansion, living under the same roof
- In code: `garden-os/story-mode/`, `garden-os/let-it-grow/`
- In UI: "Garden OS: Story Mode", "Garden OS: Let It Grow"

## When to Split Repos

Only split if Let It Grow's codebase diverges enough that shared code is minimal. For now, keep everything in `garden-os/` with separate directories per mode and shared modules at the root.

Shared candidates:
- Crop data (`specs/CROP_SCORING_DATA.json`)
- Event deck (`specs/EVENT_DECK.json`)
- Scoring algorithms (`src/scoring/`)
- Theme CSS / design tokens
- Save system patterns
