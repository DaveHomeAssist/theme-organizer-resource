# 🌱 LET IT GROW — Game + Engine Spec (v1.0)

---

## 1. GAME OVERVIEW

| Field | Value |
|-------|-------|
| Title | Let It Grow |
| Genre | Open World Sandbox / Cozy Simulation |
| Platform Targets | Web (WebGL), iOS, Android |
| Engine Strategy | TBD (Unity vs Custom Modular Engine) |
| Core Fantasy | Build, evolve, and live inside a persistent garden ecosystem |

---

## 2. CORE GAME LOOP

**Plant → Maintain → Explore → Help NPCs → Earn Rewards → Expand → Repeat**

| Layer | Systems |
|-------|---------|
| Primary | Planting, watering, harvesting |
| Secondary | NPC quests, trading, crafting |
| Passive | Growth over time (real-time + seasonal) |
| Meta | Unlock areas, tools, social progression |

---

## 3. TIME SYSTEM

| System | Behavior |
|--------|----------|
| Day Cycle | Optional (visual only or gameplay impact) |
| Seasonal | Spring, Summer, Fall, Winter |
| Monthly | Events + NPC rotations |
| Real-Time Sync | Optional toggle (server-based) |

**Events Examples:**
- Spring Bloom Festival
- Harvest Week
- Winter Dormancy Challenge

---

## 4. INVENTORY SYSTEM (RuneScape Style)

| Feature | Spec |
|---------|------|
| Slots | Limited (upgradeable) |
| Categories | Seeds, Tools, Materials, Quest Items |
| Actions | Drag/drop, stack, quick-use |
| Upgrades | Backpack tiers, toolbelt system |

---

## 5. SKILL TREE

| Skill | Effect |
|-------|--------|
| Gardening | Faster growth, higher yields |
| Soil Science | Boost soil quality |
| Composting | Create fertilizers |
| Foraging | Find rare seeds/materials |
| Social | Better NPC rewards |
| Crafting | Build tools/decor |

---

## 6. ITEM SYSTEM

### Core Categories

| Type | Examples |
|------|----------|
| Seeds | Basic, hybrid, rare |
| Tools | Watering can, shovel, scanner |
| Consumables | Fertilizer, boosters |
| Quest Items | NPC-specific |
| Decor | Cosmetic builds |

### Special Items
- "Smart Watering Can" (auto-waters nearby tiles)
- "Soil Scanner" (reveals hidden stats)
- "Heirloom Seeds" (multi-season crops)

---

## 7. NPC SYSTEM

| NPC | Role | Quest Type |
|-----|------|------------|
| Old Gus | Veteran gardener | Rare seed hunts |
| Maya | Inventor | Tool crafting |
| Lila | Chef | Ingredient farming |
| Neighbor Pool | Dynamic | Garden maintenance |

### Quest Types
- Fetch (grow X crop)
- Assist (maintain garden)
- Discover (find rare plant)
- Timed (event-based)

---

## 8. WORLD DESIGN

| Layer | Description |
|-------|-------------|
| Player Plot | Home base |
| Neighborhood | NPC gardens |
| Expansion Zones | Unlockable biomes |
| Events | Temporary map changes |

---

## 9. PROGRESSION SYSTEM

| Track | Unlocks |
|-------|---------|
| Skill XP | Passive buffs |
| Reputation | NPC rewards |
| Exploration | New areas |
| Crafting | Advanced tools |

---

## 10. MULTIPLAYER (PHASE 2+)

| Mode | Description |
|------|-------------|
| Async | Visit friends' gardens |
| Co-op | Shared tasks |
| Server Sync | Persistent world state |

---

## 11. ENGINE ARCHITECTURE (MODULAR)

### Core Systems

| Module | Status | Dependencies |
|--------|--------|--------------|
| Rendering | ✅ (existing) | GPU API |
| Physics | ✅ (curling sim) | Math core |
| Input | 🔲 | None |
| Scene System | 🔲 | Rendering |
| Asset Pipeline | 🔲 | File system |
| Scripting Layer | 🔲 | Scene + Input |
| UI System | 🔲 | Rendering |
| Audio | 🔲 | Asset system |
| Networking | 🔲 | Scripting |

---

## 12. RENDERING PIPELINE

**Scene → Camera → Culling → Sorting → Draw Calls → GPU → Frame**

| Component | Function |
|-----------|----------|
| Scene Graph | Object hierarchy |
| Camera | View + projection |
| Culling | Remove unseen objects |
| Materials | Shader definitions |
| Lighting | Directional + ambient |
| Mesh System | Geometry data |
| Texture System | GPU-bound assets |

---

## 13. DEPENDENCY MAP (CRITICAL PATH)

| System | Blocks |
|--------|--------|
| Rendering | Everything visual |
| Scene System | Gameplay logic |
| Input | Player interaction |
| Asset Pipeline | World building |
| Scripting | Game behavior |
| Networking | Multiplayer |

---

## 14. BUILD STRATEGY

### OPTION A — UNITY (FASTEST)

| Phase | Time |
|-------|------|
| Port Core Loop | 1–3 weeks |
| Systems Integration | 2–6 weeks |
| Polish + Deploy | 2–4 weeks |

✅ Pros: Fast, cross-platform | ❌ Cons: Less control

### OPTION B — CUSTOM ENGINE (POWER MOVE)

| Phase | Time |
|-------|------|
| Core Systems | 1–3 months |
| Tools + Editor | 2–6 months |
| Game Layer | Ongoing |

✅ Pros: Full control, scalable | ❌ Cons: Heavy lift

---

## 15. PRODUCT STRATEGY

| Phase | Goal |
|-------|------|
| v0.1 | Playable garden loop |
| v0.2 | NPC + quests |
| v0.3 | Seasonal system |
| v0.4 | Inventory + skills |
| v1.0 | Open-world + multiplayer |

---

## 16. KEY DECISIONS TO LOCK

| Question | Impact |
|----------|--------|
| Unity or Custom? | Timeline vs control |
| Real-time sync? | Server complexity |
| Multiplayer scope? | Architecture shift |

---
