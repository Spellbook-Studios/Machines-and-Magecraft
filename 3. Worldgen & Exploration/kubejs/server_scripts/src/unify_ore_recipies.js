// priority: 0

// Visit the wiki for more info - https://kubejs.com/

const disabled_ore_items = ['immersiveengineering:raw_uranium', 'immersiveengineering:raw_block_uranium',
    'immersiveengineering:raw_nickel', 'immersiveengineering:raw_block_nickel',
    'immersiveengineering:raw_silver', 'immersiveengineering:raw_block_silver',
    'immersiveengineering:raw_lead', 'immersiveengineering:raw_block_lead',
    'mekanism:raw_tin', 'mekanism:raw_lead', 'mekanism:block_raw_tin', 'mekanism:block_raw_lead'
]

const ingot_replace = {
    'immersiveengineering:ingot_uranium': 'mekanism:ingot_uranium',
    'immersiveengineering:ingot_nickel': 'thermal:nickel_ingot',
    'immersiveengineering:ingot_silver': 'thermal:silver_ingot',
    'immersiveengineering:ingot_lead': 'thermal:lead_ingot',
    'mekanism:ingot_tin': 'thermal:tin_ingot',
    'mekanism:ingot_lead': 'thermal:lead_ingot'
}

ServerEvents.tags('item', event => {
    // Remove tags from raw and ore items
    disabled_ore_items.forEach(item => {
        event.removeAllTagsFrom(item)
        event.add("c:hidden_from_recipe_viewers", item)
    })

    // Remove ingot tags
    for (const [orignal, replacement] of Object.entries(ingot_replace)) {
        event.removeAllTagsFrom(orignal)
        event.add("c:hidden_from_recipe_viewers", orignal)
    }
})

ServerEvents.recipes(event => {
    // Remove recipies for bad ore blocks and raw items
    disabled_ore_items.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Replace ingots with better ingots
    for (const [orignal, replacement] of Object.entries(ingot_replace)) {
        event.replaceInput({ input: orignal }, orignal, replacement)
        event.replaceOutput({ output: orignal }, orignal, replacement)
    }
})
