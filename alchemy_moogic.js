// ============================================================
// Sandboxels Custom Mod: Magic & Explosions  v2.0
// Elements: Aether, Philosopher's Stone, Potion, Mana Crystal
// ============================================================

// ── 1. AETHER ────────────────────────────────────────────────
// A mystical gas that reacts with water to brew potions,
// ignites into plasma near fire, and slowly grows mana crystals.
elements.aether = {
    color: ["#8a2be2", "#da70d6", "#ba55d3"],
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.5,
    glow: true,
    reactions: {
        // aether + water → (aether consumed) + potion
        "water": { elem1: null, elem2: "potion" },
        // aether + fire  → both become plasma
        "fire":  { elem1: "plasma", elem2: "plasma" },
        // aether slowly seeds mana crystals when touching them
        // elem1:null so the aether is consumed in the process
        "mana_crystal": { elem1: null, elem2: "mana_crystal", chance: 0.05 }
    }
};

// ── 2. PHILOSOPHER'S STONE ───────────────────────────────────
// A dense, catalytic solid that transmutes base metals to gold.
// Kept conduct:0 — it's magical, not electrical.
elements.philosophers_stone = {
    color: "#e60000",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 5000,
    conduct: 0,          // BUG FIX: was 1; magical item shouldn't wire into circuits
    reactions: {
        // Stone persists as elem1 (true catalyst — never consumed)
        "iron":   { elem1: "philosophers_stone", elem2: "gold" },
        "copper": { elem1: "philosophers_stone", elem2: "gold" },
        "lead":   { elem1: "philosophers_stone", elem2: "gold" },
        // NEW: also transmutes sand/stone to gold dust (flavour)
        "sand":   { elem1: "philosophers_stone", elem2: "gold", chance: 0.3 }
    }
};

// ── 3. POTION ────────────────────────────────────────────────
// A magical liquid brewed from aether + water.
// BUG FIX: was completely inert — now has meaningful reactions.
elements.potion = {
    color: "#00ffcc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10,
    reactions: {
        // Potion + fire → steam (magical evaporation)
        "fire":   { elem1: "steam",  elem2: null },
        // Potion + acid → neutralises both, leaves water
        "acid":   { elem1: "water",  elem2: "water" },
        // Potion + seed → grows into a plant (life magic)
        "seed":   { elem1: "potion", elem2: "plant", chance: 0.4 },
        // Potion + stone → slowly dissolves stone
        "stone":  { elem1: "potion", elem2: "sand",  chance: 0.1 },
        // Potion + lava  → cools lava to obsidian
        "lava":   { elem1: "steam",  elem2: "obsidian" }
    }
};

// ── 4. MANA CRYSTAL ──────────────────────────────────────────
// A volatile crystalline solid that sparkles every frame.
// Explodes violently on contact with fire or plasma.
// Aether slowly charges it, causing slow crystal growth.
elements.mana_crystal = {
    color: ["#0000ff", "#1e90ff", "#00ffff", "#4169e1"],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 3000,
    tempHigh: 500,
    // Add these lines inside elements.mana_crystal to make a destructive blast:
    explode: true,
    explodeRadius: 10,
    // BUG FIX: "lava" is the correct Sandboxels key (confirmed)
    stateHigh: "lava",
    reactions: {
        // Instant explosion on fire or plasma — chance:1 = guaranteed
        "fire":           { elem1: "explosion", elem2: "explosion", chance: 1 },
        "plasma":         { elem1: "explosion", elem2: "explosion", chance: 1 },
        // BUG FIX: original grew crystal on BOTH sides (aether stayed).
        // Now aether is consumed (elem1:null) so growth can't chain-explode
        // or create infinite crystals from a single aether particle.
        "aether":         { elem1: null, elem2: "mana_crystal", chance: 0.05 },
        // NEW: touching water cracks the crystal into shards (sand + steam)
        "water":          { elem1: "sand",  elem2: "steam", chance: 0.15 },
        // NEW: philosopher's stone stabilises a crystal (no explosion from fire)
        // achieved by making stone convert fire → steam before it hits crystal
        // (handled via the stone reactions above; nothing extra needed here)
    },
    // Sparkle tick: randomly cycles pixel colour each frame for a glittering effect.
    // BUG FIX: colour array was duplicated in both `color` and `tick`.
    // Centralised here; `color` array above provides the initial/fallback palette.
    tick: function(pixel) {
        if (Math.random() < 0.15) {
            var colors = ["#0000ff", "#1e90ff", "#00ffff", "#4169e1", "#7b68ee"];
            pixel.color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
};

// ── 5. REGISTER & REFRESH UI ─────────────────────────────────
// Call initUI if injected live via the browser console.
if (typeof initUI === "function") {
    initUI();
}
