// priority: 0

// Disable the raw ore item
const disabled_ore_items = ['immersiveengineering:raw_uranium', 'immersiveengineering:raw_block_uranium',
    'immersiveengineering:raw_nickel', 'immersiveengineering:raw_block_nickel',
    'immersiveengineering:raw_silver', 'immersiveengineering:raw_block_silver',
    'immersiveengineering:raw_lead', 'immersiveengineering:raw_block_lead',
    'mekanism:raw_tin', 'mekanism:raw_lead', 'mekanism:block_raw_tin', 'mekanism:block_raw_lead'
]

// Theese plates have better alternative
const disabled_plates = ['immersiveengineering:plate_copper',
    'immersiveengineering:plate_lead',
    'immersiveengineering:plate_silver',
    'immersiveengineering:plate_constantan',
    'immersiveengineering:plate_electrum',
    'immersiveengineering:plate_gold',
    'immersiveengineering:plate_iron',
    'immersiveengineering:plate_nickel']

const ingot_replace = {
    // Alloy Ingots
    'immersiveengineering:ingot_electrum': 'thermal:electrum_ingot',
    'immersiveengineering:ingot_constantan': 'thermal:constantan_ingot',
    'immersiveengineering:ingot_steel': 'mekanism:ingot_steel',
    'mekanism:ingot_bronze': 'thermal:bronze_ingot',

    // Ore Ingots
    'immersiveengineering:ingot_uranium': 'mekanism:ingot_uranium',
    'immersiveengineering:ingot_nickel': 'thermal:nickel_ingot',
    'immersiveengineering:ingot_silver': 'thermal:silver_ingot',
    'immersiveengineering:ingot_lead': 'thermal:lead_ingot',
    'mekanism:ingot_tin': 'thermal:tin_ingot',
    'mekanism:ingot_lead': 'thermal:lead_ingot'
}

// Alloy dusts (Ingame its called grit)
const disabled_dusts = ["immersiveengineering:dust_electrum", "immersiveengineering:dust_constantan", "immersiveengineering:dust_steel", "mekanism:dust_bronze"]

ServerEvents.tags('item', event => {
    // Remove tags and hide
    disabled_plates.forEach(item => {
        event.removeAllTagsFrom(item)
        event.add("c:hidden_from_recipe_viewers", item)
    })

    disabled_dusts.forEach(item => {
        event.removeAllTagsFrom(item)
        event.add("c:hidden_from_recipe_viewers", item)
    })

    disabled_ore_items.forEach(item => {
        event.removeAllTagsFrom(item)
        event.add("c:hidden_from_recipe_viewers", item)
    })

    for (const [orignal, replacement] of Object.entries(ingot_replace)) {
        event.removeAllTagsFrom(orignal)
        event.add("c:hidden_from_recipe_viewers", orignal)
    }
})

ServerEvents.recipes(event => {
    // Plates
    disabled_plates.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // There are still 3 types of mekanism plates that don't have an alternative
    event.remove({ id: 'immersiveengineering:crafting/plate_aluminum_hammering' })
    event.remove({ id: 'immersiveengineering:crafting/plate_uranium_hammering' })
    event.remove({ id: 'immersiveengineering:crafting/plate_steel_hammering' })
    event.recipes.thermal.press('immersiveengineering:plate_aluminum', '#forge:ingots/aluminum')
    event.recipes.thermal.press('immersiveengineering:plate_uranium', '#forge:ingots/uranium')
    event.recipes.thermal.press('immersiveengineering:plate_steel', '#forge:ingots/steel')

    // Remove dust recipes
    disabled_dusts.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Remove recipies for bad ore blocks and raw items
    disabled_ore_items.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Remove ingots
    for (const [orignal, replacement] of Object.entries(ingot_replace)) {
        event.remove({ output: orignal })
        event.remove({ input: orignal })
    }
})
