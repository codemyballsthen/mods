// Sandboxels Custom Mod: Magic & Explosions
// Elements: Aether, Philosopher's Stone, and Mana Crystal

// 1. Define Aether
elements.aether = {
    color: ["#8a2be2", "#da70d6", "#ba55d3"], 
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.5,
    glow: true,
    reactions: {
        "water": { elem1: null, elem2: "potion" },
        "fire": { elem1: "plasma", elem2: "plasma" }
    }
};

// 2. Define Philosopher's Stone
elements.philosophers_stone = {
    color: "#e60000",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 5000,
    conduct: 1,
    reactions: {
        "iron": { elem1: "philosophers_stone", elem2: "gold" },
        "copper": { elem1: "philosophers_stone", elem2: "gold" },
        "lead": { elem1: "philosophers_stone", elem2: "gold" }
    }
};

// 3. Define Potion
elements.potion = {
    color: "#00ffcc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10
};

// 4. Mana Crystal (With Animated Sparkle Texture)
elements.mana_crystal = {
    color: ["#0000ff", "#1e90ff", "#00ffff", "#4169e1"], 
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 3000,
    tempHigh: 500,
    stateHigh: "lava", 
    reactions: {
        "fire": { elem1: "explosion", chance: 1 },
        "plasma": { elem1: "explosion", chance: 1 },
        "aether": { elem1: "mana_crystal", elem2: "mana_crystal", chance: 0.1 } 
    },
    // The tick function runs every frame to change individual pixel colors randomly
    tick: function(pixel) {
        if (Math.random() < 0.15) { // 15% chance to change color each frame
            var colors = ["#0000ff", "#1e90ff", "#00ffff", "#4169e1"];
            pixel.color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
};

// Force UI to refresh if injected over console
if (typeof initUI === "function") {
    initUI();
}
