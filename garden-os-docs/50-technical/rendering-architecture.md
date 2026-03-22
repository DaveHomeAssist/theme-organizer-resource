# Rendering Architecture

## Stack

- **Three.js** 0.180.x (WebGL)
- **No framework** — vanilla JS scene management
- **Canvas viewport** — single `<canvas>` element in `index.html`

## Pipeline

```
State → Scene Sync → Camera Update → Three.js Render → GPU → Frame
```

The render loop (`loop.js`) runs at screen refresh rate. Game logic is **not** frame-driven — it's event/turn-driven. The loop only handles:
1. Calculate delta time (capped at 50ms)
2. Sync scene to current state
3. Render frame

## Scene Graph (`garden-scene.js`)

### Renderer Setup
- WebGL with shadow mapping enabled
- ACES filmic tone mapping
- Canvas-based sky gradient (not skybox)
- Responsive resize handling

### Lighting Rig
| Light | Type | Purpose |
|-------|------|---------|
| Hemisphere | Ambient | Sky/ground color fill |
| Directional | Sun | Primary shadows, seasonal angle |
| Fill | Point/spot | Reduce harsh shadows |
| Rim | Back light | Edge definition |

### Seasonal Presets
Each season defines: sky colors, fog density/color, sun position, ambient color, light intensity

### Mood Presets (8)
| Mood | Use Case |
|------|----------|
| Dawn | Morning scenes |
| Calm | Default state |
| Storm | Weather events |
| Heat | Summer events |
| Harvest Gold | Harvest phase |
| Night | Evening scenes |
| Celebration | Achievement moments |
| Loss | Negative events |

## Garden Bed (`bed-model.js`)

### Geometry
- 8×4 cedar frame (4 planks, beveled edges)
- 32 soil cell planes with seeded random height/color variation
- Back: lattice trellis (posts + rails + tension wires)
- Front: critter guard (chicken wire mesh + support posts)
- Grid lines (vertical + horizontal, semi-transparent)
- Row labels as color-coded text sprites

### Materials
| Material | Use |
|----------|-----|
| Cedar wood | Frame planks |
| Dark cedar | Frame accents |
| Dark soil | Cell surfaces |
| Transparent | Grid lines |

## Crop Rendering

8 faction types with distinct visual representations:
- Climbers, Fast Cycles, Greens, Roots, Herbs, Fruiting, Brassicas, Companions
- Support props: stakes, mulch patches, protection domes, companion patches
- Damage visuals per damage type

## Scenery (`scenery.js`)

### Static Props
House (back wall, porch, door, window), neighbor's house, fence, landscape (mulch bed, hedges, flowers), gravel paths, pebbles

### Interactive Props
Watering can, hose, gloves, basket, seed packets, kneeling pad, radio, clothesline, pots

### Animated Elements
| Element | Animation |
|---------|-----------|
| Clouds | Horizontal drift |
| Chimney smoke | Particle system |
| Fireflies | Movement + opacity pulse |
| Butterflies | Sine-wave drift (summer) |
| Leaves | Scattered geometry (fall) |
| Snow | Frame edge accumulation (winter) |
| Puddles | Reflective planes (spring) |

### Conditional Visibility
- Notebook/sauce jar appear after chapter 2
- Planning props toggle by phase
- Seasonal items swap per season

## Weather FX (`weather-fx.js`)

| Effect | Implementation | Default Season |
|--------|---------------|----------------|
| Rain | 300 particle points, 3–5 units/sec fall | Spring |
| Frost | Semi-transparent white plane, fade-in | Winter |
| Sun Rays | Overhead spotlight, pulsing cone | Summer |

Triggered by keyword matching on event title/description (rain, frost, heat, wind).

## Camera (`camera-controller.js`)

### Controls
- Orbit: spherical coordinates (theta, phi clamped 0.48–1.34 rad)
- Zoom: pinch (±0.02/px) and wheel (0.01 sensitivity), radius 4.4–11.5
- Pointer events with passive listeners
- Auto drag-state clearing

### Preset Poses
| Preset | Use |
|--------|-----|
| Overview | Default wide shot |
| Closeup | Detail inspection |
| Side | Profile angle |
| Birds | Top-down |
| Chapter Intro | Narrative opening |
| Harvest Hero | Score reveal angle |

Transitions use linear interpolation (lerp speed 0.1, completes at 0.01 tolerance).

## Interaction

- **Raycaster**: cell picking on click/tap
- **Hover highlighting**: visual feedback on mouseover
- **Targetable cells**: highlighted during intervention selection
- **Touch**: enlarged targets for mobile
