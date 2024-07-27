// priority: 0

// Visit the wiki for more info - https://kubejs.com/

ServerEvents.recipes(event => {
    Item.of('kubejs:cured_leather', 0), // arg 1: output
        [
            'SSS',
            'LLL', // arg 2: the shape (array of strings)
            'SSS'
        ],
        {
            S: 'mekanism:salt',
            L: 'kubejs:untanned_leather'
        }
})

LootJS.modifiers((event) => {
    event
        .addLootTableModifier(/.*entit.*/).replaceLoot("minecraft:leather", "kubejs:untanned_leather")
});

