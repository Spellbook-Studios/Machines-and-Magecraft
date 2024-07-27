// priority: 0

// Visit the wiki for more info - https://kubejs.com/

const disabled_plates = ['immersiveengineering:plate_copper',
    'immersiveengineering:plate_lead',
    'immersiveengineering:plate_silver',
    'immersiveengineering:plate_constantan',
    'immersiveengineering:plate_electrum',
    'immersiveengineering:plate_gold',
    'immersiveengineering:plate_iron',
    'immersiveengineering:plate_nickel']

ServerEvents.tags('item', event => {
    // Remove tags and hide
    disabled_plates.forEach(item => {
        event.removeAllTagsFrom(item)
        event.add("c:hidden_from_recipe_viewers", item)
    })
})

ServerEvents.recipes(event => {
    // Remove recipies
    disabled_plates.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })
})
