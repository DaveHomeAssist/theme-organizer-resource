# Characters and Cutscenes

## Character System

### Speaker Registry (`speakers.js`)

| ID | Name | Side | Default Emotion | Animation | Special |
|----|------|------|-----------------|-----------|---------|
| `garden_gurl` | Garden GURL | Left | Warm | Talk | — |
| `onion_man` | Onion Man | Right | Sad | Talk | — |
| `vegeman` | Vegeman | Left | Smirk | Talk | — |
| `critters` | Critters | Right | Surprised | Talk | — |
| `calvin` | Calvin | Right | Neutral | Idle | Thought bubbles |
| `narrator` | Narrator | — | — | — | No portrait |

### Portrait System (`portraits.js`)
- 5 characters with CSS-only rendering
- 6 layers per portrait: base, body, eyes, mouth, overlay
- 6 emotional states: neutral, warm, sad, surprised, smirk, emphasis
- `resolvePortraitLayers(portrait, emotion)` merges base with emotion overrides

### Calvin (Animated Sheepdog)
- Procedurally animated in Three.js
- Articulated legs with walk cycle
- Shadow rendering
- Timing synchronized to opening narration
- Thought bubble presentation (not speech)

## Cutscene System

### Architecture

```
cutscenes.js (data)  →  cutscene-machine.js (state machine)  →  dialogue-panel.js (rendering)
     50+ scenes              queue + priority                     portrait + text + typing
```

### Cutscene Data Structure
```js
{
  id: "ch1_opening",
  trigger: "chapter_start",
  conditions: { chapter: 1 },
  priority: 10,
  once: true,
  beats: [
    { speaker: "narrator", text: "...", emotion: "neutral", camera: "overview" },
    { speaker: "calvin", text: "...", emotion: "warm", camera: "closeup" }
  ]
}
```

### Trigger Types
| Trigger | When | Example |
|---------|------|---------|
| `chapter_start` | Beginning of each chapter | Opening narration |
| `harvest` | After harvest scoring | Grade-based commentary |
| `intervention` | After player acts | Reaction to protect/mulch/prune |
| `event` | After seasonal event | Weather commentary |
| `keepsake` | When item unlocked | Commemorative moment |

### Dynamic Cutscene Builders
3 functions generate narratives on-the-fly based on game context:

1. **`buildDynamicEventCutscene()`**
   - Routes by: event family + season + valence
   - Speaker selection based on event category
   - Not generic fallbacks — contextual dialogue

2. **`buildDynamicInterventionCutscene()`**
   - Reacts to: intervention type + target + outcome
   - Different speakers for different actions

3. **`buildDynamicHarvestCutscene()`**
   - Based on: grade + season + recipe matches
   - Emotional tone scales with performance

### Cutscene Machine (`cutscene-machine.js`)
- **Queue**: Multiple cutscenes can be pending
- **Priority**: Higher priority interrupts lower
- **Seen tracking**: `seenSceneIds` prevents repeats (for `once: true` scenes)
- **Typing**: Character-by-character reveal (30ms normal, 5ms fast-forward)
- **Camera integration**: Scenes can set camera presets and moods
- **Auto-advance**: Optional timer between beats

### Dialogue Panel (`dialogue-panel.js`)
- Visual novel style: portrait on side, text in center
- Speaker badge with name
- Progress dots showing beat position
- Skip button (when allowed)
- Accessibility: `aria-live`, `aria-atomic`

## Let It Grow NPC Extensions

### New Characters Needed

| NPC | Portrait Style | Emotion Set | Interaction Mode |
|-----|---------------|-------------|-----------------|
| Old Gus | Weathered farmer | Gruff, warm, nostalgic, amused | Dialogue tree + quests |
| Maya | Goggles, overalls | Excited, focused, frustrated, eureka | Dialogue tree + crafting |
| Lila | Apron, warm smile | Welcoming, expectant, impressed, disappointed | Dialogue tree + recipes |
| Neighbors | Template-based | Neutral, grateful, worried | Simple quest dialogue |

### Dialogue Branching
Current system is **linear** (beat → beat → beat). Let It Grow needs:
- Player choice buttons (2–4 options)
- Choice affects: next beat, quest acceptance, reputation gain
- `dialogue-panel.js` needs choice button rendering
- `cutscene-machine.js` needs branching beat flow
