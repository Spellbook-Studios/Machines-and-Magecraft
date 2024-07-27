// priority: 0

ServerEvents.tags('item', event => {
    event.add("c:hidden_from_recipe_viewers", "enderio:filled_soul_vial")
    
    // Hide the only solid and not solid to x, glass
    //const glass = event.get('forge:stone').getObjectIds()
})