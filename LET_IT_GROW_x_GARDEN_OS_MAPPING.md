# 🌱 LET IT GROW × Garden OS Story Mode — Systems Mapping

> How the Let It Grow spec maps to what already exists in `DaveHomeAssist/garden-os/story-mode/`

---

## EXECUTIVE SUMMARY

Garden OS Story Mode is **not starting from zero** — it's a 12-chapter, turn-based farming narrative built on Three.js with a mature module architecture. Roughly **40–50% of Let It Grow's core systems already exist** in some form. The gap is primarily in open-world exploration, NPC depth, real-time mechanics, and multiplayer.

---

## SYSTEM-BY-SYSTEM MAPPING

### ✅ ALREADY BUILT (Reusable As-Is or With Light Extension)

| Let It Grow Spec | Garden OS Module | Status | Notes |
|------------------|-----------------|--------|-------|
| **Planting** | `src/game/phase-machine.js` | ✅ Done | Turn-based planting with cell-click targeting. Phase machine implements full PLAN → EVENT → INTERVENE → HARVEST flow |
| **Harvesting** | `src/game/phase-machine.js` + `src/scoring/` | ✅ Done | Harvest scoring exposes recipe matches, yield lists. `bed-score.js` and `cell-score.js` handle calculation |
| **Seasonal System** | `src/game/state.js` + `src/scene/weather-fx.js` | ✅ Done | Spring/Summer/Fall/Winter with seasonal lighting, weather FX, and winter dormancy (frosted tint on dormant plots) |
| **Crop Database** | `src/data/crops.js` + `specs/CROP_SCORING_DATA.json` | ✅ Done | Factions, chapter-gated unlocks, recipe matching. `getCropsByFaction()`, `getCropsForChapter()` |
| **Event System** | `src/data/events.js` + `src/game/event-engine.js` | ✅ Done | Weighted random draw from canonical deck. Season/chapter filtering. Frost, storm, flood, heat, blight, pest damage types. Protection mechanics |
| **Inventory/Backpack** | `src/ui/backpack-panel.js` | ✅ Partial | Backpack panel exists. Needs expansion for RuneScape-style slots, drag/drop, stacking |
| **Scene/Camera** | `src/scene/garden-scene.js` + `camera-controller.js` | ✅ Done | Three.js scene with front-of-bed camera, seasonal lighting, background depth |
| **Save System** | `src/game/save.js` | ✅ Done | Multi-slot campaign persistence. Rebuilds SeasonState from saved chapter/season data |
| **Rendering** | Three.js pipeline in `src/scene/` | ✅ Done | 3D garden bed model, scenery, weather FX, procedural animation |
| **Scoring/Progression** | `src/scoring/bed-score.js` + `cell-score.js` | ✅ Done | Per-cell and per-bed scoring. Recipe matching. Grade system |
| **Keepsakes (Collectibles)** | `src/data/keepsakes.js` | ✅ Done | 7 keepsake items tied to chapter milestones, persists across campaigns |

---

### 🟡 PARTIALLY BUILT (Needs Extension for Let It Grow)

| Let It Grow Spec | Garden OS Foundation | Gap | Effort |
|------------------|---------------------|-----|--------|
| **NPC System** | `src/data/speakers.js` + `portraits.js` — 6 characters: garden_gurl, onion_man, vegeman, critters, calvin, narrator | Existing NPCs are **commentators** (reactive dialogue), not quest-givers. Need: quest state machines, reputation tracking, NPC schedules | Medium |
| **NPC Dialogue** | `src/ui/dialogue-panel.js` + `src/game/cutscene-machine.js` — 40+ cutscenes, dynamic commentary by event/season/valence | Dialogue is narrative-driven (cutscenes), not interactive. Need: branching choices, quest acceptance/completion flows | Medium |
| **Cutscene/Narrative** | `src/data/cutscenes.js` — Dynamic builders for events, interventions, harvests. Speaker routing by context | Cutscenes are triggered by game events, not player-initiated exploration. Need: exploration triggers, NPC encounter cutscenes | Low–Medium |
| **Intervention Tools** | `src/game/intervention.js` — protect, mulch, companion_patch, prune, swap, accept_loss | These are **turn-based tactical actions**, not free-roam tools. Need: real-time tool use (watering can, shovel, scanner) mapped to inventory | Medium |
| **UI Panels** | `src/ui/` — 9 modules: backpack, chapter-text, dialogue, event-card, harvest-reveal, pause, read-only-sheet, season-calendar, winter-review | Good component library. Need: skill tree UI, crafting UI, NPC quest journal, world map | Medium |
| **Character Animation** | Calvin (sheepdog) — procedural legs, shadow, timing synced to narration | Single character. Need: NPC sprite/model system for Old Gus, Maya, Lila, etc. | Medium |
| **Time System** | Seasonal (4 seasons × 3 months = 12 chapters) | Turn-based months, not real-time. Need: optional day cycle, real-time sync toggle, monthly event rotations | Medium |

---

### 🔲 NOT YET BUILT (New Systems Required)

| Let It Grow Spec | What's Needed | Complexity | Priority |
|------------------|---------------|------------|----------|
| **Open World / Exploration** | Player movement beyond plot. Neighborhood, expansion zones, biome unlocks | High | v0.2+ |
| **Skill Tree** | XP tracking, passive buff engine, skill unlock UI (Gardening, Soil Science, Composting, Foraging, Social, Crafting) | Medium | v0.4 |
| **Crafting System** | Recipe discovery, material combining, tool creation | Medium | v0.4 |
| **Trading** | NPC buy/sell, economy balancing, price fluctuation | Medium | v0.2+ |
| **Quest State Machine** | Accept → Track → Complete → Reward pipeline with fetch/assist/discover/timed types | Medium | v0.2 |
| **Real-Time Growth** | Server-synced plant timers (vs current turn-based) | High | v0.3+ |
| **Day/Night Cycle** | Visual or gameplay-impacting light cycle | Low | v0.3 |
| **World Map** | Zone navigation, unlockable areas, biome transitions | High | v0.2+ |
| **Audio System** | SFX + ambient + music per season/biome | Medium | v0.3 |
| **Input System** | Free-roam movement, tool switching, gesture support | Medium | v0.1 |
| **Multiplayer** | Async garden visits, co-op tasks, server sync | Very High | v1.0 |
| **Networking** | WebSocket/REST state sync, auth, persistence | Very High | v1.0 |

---

## ARCHITECTURE ALIGNMENT

### Garden OS Story Mode Architecture
```
main.js (orchestrator)
├── src/data/       → Static registries (crops, events, cutscenes, keepsakes, speakers, portraits)
├── src/game/       → Engine (phase-machine, event-engine, intervention, cutscene-machine, save, state, loop)
├── src/scene/      → Three.js (garden-scene, bed-model, camera, scenery, weather-fx)
├── src/scoring/    → Math (bed-score, cell-score)
├── src/ui/         → DOM panels (backpack, dialogue, calendar, harvest-reveal, etc.)
└── assets/css/     → theme.css (Fraunces + DM Sans + DM Mono)
```

### What Let It Grow Adds
```
NEW: src/world/       → Zone management, biome loading, player movement
NEW: src/npc/         → Quest engine, reputation, schedules, dialogue trees
NEW: src/skills/      → XP tracking, skill tree, passive buff engine
NEW: src/crafting/    → Recipe system, material management
NEW: src/inventory/   → Full RuneScape-style slot system (extend backpack-panel)
NEW: src/audio/       → Sound manager, seasonal ambience
NEW: src/network/     → Multiplayer sync (Phase 2+)
EXTEND: src/game/     → Real-time loop option, free-roam input
EXTEND: src/scene/    → World camera, NPC models, biome scenes
EXTEND: src/ui/       → Skill tree, quest journal, world map, crafting bench
```

---

## CRITICAL PATH: What To Build First

### Phase v0.1 — Playable Garden Loop (Fastest Path)
Garden OS story mode **already delivers this**. The existing phase machine provides:
- Plant crops on a grid ✅
- Seasonal events affect growth ✅
- Harvest and score ✅
- Save/load campaigns ✅

**Gap for v0.1**: Add free-roam input + real-time watering/tool use to replace turn-based flow.

### Phase v0.2 — NPC + Quests
- Extend `speakers.js` → full NPC profiles (Old Gus, Maya, Lila)
- Build quest state machine on top of `cutscene-machine.js`
- Add reputation tracking to `state.js`
- New `dialogue-panel.js` mode for interactive choices

### Phase v0.3 — Seasonal System (Enhancement)
- Already seasonal ✅ — add real-time sync toggle
- Add day/night visual cycle to `weather-fx.js`
- Monthly event rotation via `events.js` deck system
- Seasonal festival events (Spring Bloom, Harvest Week, Winter Dormancy)

### Phase v0.4 — Inventory + Skills
- Expand `backpack-panel.js` → full slot grid with drag/drop
- New skill tree module + UI
- Crafting system using existing recipe infrastructure

---

## STRATEGIC RECOMMENDATION

**Garden OS Story Mode is your v0.1 prototype.** The turn-based phase machine, scoring engine, event system, and Three.js scene are production-quality foundations. The smartest move:

1. **Fork story-mode as the Let It Grow base** — don't rebuild what works
2. **Add free-roam input layer** on top of the existing grid
3. **Evolve NPCs from commentators to quest-givers** — the speaker/portrait/cutscene infrastructure is ready
4. **Keep the turn-based option** as a "story mode" alongside real-time play

The existing 40+ cutscenes, 6 characters, seasonal weather, and save system give you months of head start.
