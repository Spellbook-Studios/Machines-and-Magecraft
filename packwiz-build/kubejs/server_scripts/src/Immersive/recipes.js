// priority: 0

ServerEvents.recipes(event => {
    // Iron Mechanical Component
    event.remove({output: 'mmersiveengineering:component_iron'})
    let inter = 'kubejs:iron_component_incomplete' // intermediary component

    event.recipes.create.sequenced_assembly([ // Results
        Item.of('immersiveengineering:component_iron').withChance(80.0),
        Item.of('create:golden_sheet').withChance(15.0),
        Item.of('create:precision_mechanism').withChance(5.0)
    ],'create:precision_mechanism', //Input 
    [ // Steps
        event.recipes.createDeploying(inter, [inter, '#forge:plates/iron']),
        event.recipes.createDeploying(inter, [inter, '#forge:plates/iron']),
        event.recipes.createDeploying(inter, [inter, '#forge:ingots/copper']),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(2)
    
    // Steel Mechanical Component
    event.remove({output: 'mmersiveengineering:component_steel'})
    inter = 'kubejs:steel_component_incomplete' // intermediary component

    event.recipes.create.sequenced_assembly([ // Results
        Item.of('immersiveengineering:component_steel').withChance(80.0),
        Item.of('create:golden_sheet').withChance(15.0),
        Item.of('create:precision_mechanism').withChance(5.0)
    ],'create:precision_mechanism', //Input 
    [ // Steps
        event.recipes.createDeploying(inter, [inter, '#forge:plates/steel']),
        event.recipes.createDeploying(inter, [inter, '#forge:plates/steel']),
        event.recipes.createDeploying(inter, [inter, '#forge:ingots/copper']),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(2)
})