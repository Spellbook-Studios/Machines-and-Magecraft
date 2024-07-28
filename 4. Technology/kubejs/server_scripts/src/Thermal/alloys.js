// priority: 0

const thermal_alloys = [
    {
        "out": 4,
        "ingot": "thermal:bronze_ingot",
        "blend": "thermal:bronze_dust",
        "metals": ["copper","copper","copper","tin"],
        "other": []
    },
    {
        "out": 2,
        "ingot": "thermal:electrum_ingot",
        "blend": "thermal:electrum_dust",
        "metals": ["gold", "silver"],
        "other": []
    },
    {
        "out": 3,
        "ingot": "thermal:invar_ingot",
        "blend": "thermal:invar_dust",
        "metals": ["iron", "iron", "nickel"],
        "other": []
    },
    {
        "out": 2,
        "ingot": "thermal:constantan_ingot",
        "blend": "thermal:constantan_dust",
        "metals": ["copper", "nickel"],
        "other": []
    },
    {
        "out": 4,
        "ingot": "thermal:signalum_ingot",
        "blend": "thermal:signalum_dust",
        "metals": ["copper", "copper", "copper", "silver"],
        "other": ["minecraft:redstone", "minecraft:redstone", "minecraft:redstone", "minecraft:redstone"]
    },
    {
        "out": 4,
        "ingot": "thermal:lumium_ingot",
        "blend": "thermal:lumium_dust",
        "metals": ["tin", "tin", "tin", "silver"],
        "other": ["minecraft:glowstone_dust", "minecraft:glowstone_dust"]
    },
    {
        "out": 4,
        "ingot": "thermal:enderium_ingot",
        "blend": "thermal:enderium_dust",
        "metals": ["lead", "lead", "lead"],
        "other": ["#forge:dusts/diamond", "minecraft:ender_pearl", "minecraft:ender_pearl"]
    }
]

function makedusts(metals) {
    var out = []
    for(const metal of metals) {
        out.push("#forge:dusts/" + metal)
    }

    return out;
}

function makeingots(metals) {
    var out = []
    for(const metal of metals) {
        out.push("#forge:ingots/" + metal)
    }

    return out;
}

ServerEvents.recipes(event => {
    event.remove({output: '#thermal:glass/hardened', input: 'minecraft:fire_charge'})

    // Remove a way to create ingot blends using crafting
    /*event.remove({type: "minecraft:crafting_shapeless", output: "thermal:lumium_dust"})
    /*event.remove({type: "minecraft:crafting_shapeless", output: "thermal:enderium_dust"})*/
    for (const alloy of thermal_alloys) {
        // Remove shapeless crafting recipe
        event.remove({output: alloy.ingot, input: 'minecraft:fire_charge'})
        event.remove({type: "minecraft:crafting_shapeless", output: alloy.blend})

        // Remove normal smelting of blend and only allow for blasting
        event.remove({type: "minecraft:smelting", output: alloy.ingot})

        event.recipes.createMixing(alloy.out + 'x ' + alloy.blend, makedusts(alloy.metals).concat(alloy.other))
        event.recipes.createMixing(alloy.out + 'x ' + alloy.ingot, makeingots(alloy.metals).concat(alloy.other)).superheated()
    }
})