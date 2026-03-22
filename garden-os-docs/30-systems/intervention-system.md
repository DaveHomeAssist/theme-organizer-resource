# Intervention System

## Current Implementation (Story Mode)

### Overview
Interventions are player actions taken in response to seasonal events. Players spend tokens to mitigate damage or boost growth on specific cells.

**Source**: `src/game/intervention.js`

### Available Interventions

| Action | ID | Effect | Target |
|--------|----|--------|--------|
| Protect | `protect` | Shields cell from current event | Any planted cell |
| Mulch | `mulch` | +0.5 bonus this season, +0.25 carry-forward | Any planted cell |
| Companion Patch | `companion_patch` | +1.0 intervention bonus | Any planted cell |
| Prune | `prune` | Removes crop entirely | Any planted cell |
| Swap | `swap` | Exchanges crop IDs between two adjacent cells | Adjacent planted cells |
| Accept Loss | `accept_loss` | No-op, saves token for later | N/A |

### Targeting System
- `getTargetableCells(type)` returns valid cell indices for each intervention
- `getPlantedIndices()` finds occupied cells
- `getAdjacentPlantedIndices()` finds neighbors (cardinal directions only)
- Boundary checking enforced throughout
- UI highlights valid targets during selection

### Token Economy
- Players receive intervention tokens at season start
- Each action costs 1 token (except accept_loss which costs 0)
- Unused tokens do not carry over

### Protection Mechanics
- Protected cells skip event damage
- Protection flags clear after event resolution (one-time use)
- Event engine (`event-engine.js`) checks protection before applying modifiers

### Carry-Forward
- Mulch and event effects can carry into next season
- Types: "enriched" (positive) or "compacted" (negative)
- `resolveCarryForwardType()` parses event text to classify

## Let It Grow Extensions

### Tool-Based Interventions
Replace token system with inventory-based tools:
- Watering can → water specific cells
- Fertilizer bags → apply from inventory
- Pest spray → protect from blight/pest events
- Pruning shears → prune action tied to tool durability

### Real-Time Response
- Events unfold over time, not instantly
- Player can physically walk to affected area and respond
- Urgency mechanic: faster response = better outcome

### New Intervention Types
- **Transplant**: Move a crop to a different bed entirely
- **Graft**: Combine two crops for hybrid results
- **Cover Crop**: Plant a temporary crop for soil benefit
- **Raised Barrier**: Physical defense structure (crafted item)
