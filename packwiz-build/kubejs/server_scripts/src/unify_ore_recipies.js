// priority: 0

// Visit the wiki for more info - https://kubejs.com/

const disabled_ore_items = ['immersiveengineering:raw_uranium', 'immersiveengineering:raw_block_uranium',
    'immersiveengineering:raw_nickel', 'immersiveengineering:raw_block_nickel',
    'immersiveengineering:raw_silver', 'immersiveengineering:raw_block_silver',
    'immersiveengineering:raw_lead', 'immersiveengineering:raw_block_lead',
    'mekanism:raw_tin', 'mekanism:raw_lead', 'mekanism:block_raw_tin', 'mekanism:block_raw_lead'
]

ServerEvents.tags('item', event => {
    disabled_ore_items.forEach(item => {
        event.removeAllTagsFrom(item)
    })

    // Remove ingot manually
    event.removeAllTagsFrom('immersiveengineering:ingot_uranium')
    event.removeAllTagsFrom('immersiveengineering:ingot_nickel')
    event.removeAllTagsFrom('immersiveengineering:ingot_silver')
    event.removeAllTagsFrom('immersiveengineering:ingot_lead')
    event.removeAllTagsFrom('mekanism:ingot_tin')
    event.removeAllTagsFrom('mekanism:ingot_lead')
})

ServerEvents.recipes(event => {
    disabled_ore_items.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Remove ingot manually
    event.replaceInput({}, 'immersiveengineering:ingot_uranium', '#forge:ingots/uranium')
    event.replaceInput({}, 'immersiveengineering:ingot_nickel', '#forge:ingots/nickel')
    event.replaceInput({}, 'immersiveengineering:ingot_silver', '#forge:ingots/silver')
    event.replaceInput({}, 'immersiveengineering:ingot_lead', '#forge:ingots/lead')
    event.replaceInput({}, 'mekanism:ingot_tin', '#forge:ingots/tin')
    event.replaceInput({}, 'mekanism:ingot_lead', '#forge:ingots/lead')
})