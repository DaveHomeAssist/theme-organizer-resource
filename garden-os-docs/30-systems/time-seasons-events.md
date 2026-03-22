# Time, Seasons, and Events

## Current Time Model (Story Mode)

### Structure
- 12 chapters = 4 seasons × 3 years
- Each chapter = 1 season
- Each season = 6 phases: PLANNING → EARLY_SEASON → MID_SEASON → LATE_SEASON → HARVEST → TRANSITION
- Beat phases (early/mid/late) each draw an event from the deck

### Season Calendar (`season-calendar.js`)
- Displays chapter, season, year, and beat progress
- `SEASON_MONTHS`: spring → [Mar, Apr, May], summer → [Jun, Jul, Aug], etc.
- Year calculated from chapter count

## Event System

### Event Deck (`events.js` + `EVENT_DECK.json`)
- Canonical deck of weighted events
- `drawEvent(season, chapter, alreadyDrawn)` selects from available pool
- **Weighted random**: `drawWeight` determines probability
- **Filtering**: season-locked, chapter-gated, no duplicates within season
- **Damage types**: frost, storm, flood, heat, blight, pest, generic impact

### Event Targeting (`event-engine.js`)
| Target Type | Behavior |
|-------------|----------|
| `all` | Every cell affected |
| `random` | 50% chance per cell |
| `vulnerable` | Crops matching vulnerability filter |
| `faction` | Crops in specific faction |
| `row` | Specific row(s) |
| (default) | Planted cells only |

### Event Resolution Flow
1. Event drawn from deck
2. Player sees event card with description and intervention options
3. Player chooses intervention + target cell
4. `applyEventEffect()` processes grid:
   - Skip protected cells (log separately)
   - Apply modifier to matching cells
   - Set damage states and carry-forward
   - Clear protection flags
5. Return summary (affected cells, protected cells, metadata)

## Let It Grow Time Extensions

### Day/Night Cycle
| Option | Description |
|--------|-------------|
| Visual only | Sky color, lighting changes, ambient sounds |
| Gameplay impact | Some crops grow faster in daylight, NPCs have schedules |

### Real-Time Sync
| Feature | Implementation |
|---------|----------------|
| Server clock | Optional WebSocket time source |
| Growth timers | Crops grow while player is away |
| Event scheduling | Events trigger at real calendar times |
| Toggle | Player can switch between real-time and turn-based |

### Monthly Events
- NPC rotations each in-game month
- Limited-time quests tied to calendar
- Seasonal festivals with special mechanics

### Festival Events
| Season | Festival | Mechanic |
|--------|----------|----------|
| Spring | Bloom Festival | Bonus seed drops, planting XP multiplier |
| Summer | Midsummer Market | Trading bonuses, NPC shop refresh |
| Fall | Harvest Week | Scoring multipliers, recipe completion bonuses |
| Winter | Dormancy Challenge | Soil management puzzle, planning rewards |

## Seasonal Rendering (Already Built)

### Visual Presets (`garden-scene.js`)
Each season has distinct: sky colors, fog density, sun angle, ambient light

### Weather FX (`weather-fx.js`)
- **Rain**: 300 particles, spring default
- **Frost**: White overlay plane, winter default
- **Sun Rays**: Pulsing spotlight, summer default
- Keyword-triggered from event descriptions

### Scenery (`scenery.js`)
- Tree/shrub colors swap per season (4 palettes)
- Seasonal props: planning items (spring), harvest baskets (fall)
- Animated: clouds drift, chimney smoke, fireflies (summer evenings)

### Scene Decorations (`garden-scene.js`)
- Fall: leaf geometry scattered
- Winter: snow on frame edges
- Spring: reflective puddles
- Summer: animated butterflies with sine-wave drift
