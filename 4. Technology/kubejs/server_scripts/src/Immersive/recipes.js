// priority: 0

const disabled_immersive_generators = [
    'immersiveengineering:watermill',
    'immersiveengineering:waterwheel_segment',
    'immersiveengineering:windmill_blade',
    'immersiveengineering:windmill',
    'immersiveengineering:windmill_sail',
    'immersiveengineering:dynamo'
]

ServerEvents.tags('item', event => {
    disabled_immersive_generators.forEach(item =>  {
        event.add("c:hidden_from_recipe_viewers", item)
    })
})

ServerEvents.recipes(event => {
    // Iron Mechanical Component
    event.remove({output: 'immersiveengineering:component_iron'})
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
    event.remove({output: 'immersiveengineering:component_steel'})
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

    // Make immersive funger med create
    event.replaceInput({ output: 'immersiveengineering:blastbrick'}, 'minecraft:brick', '#forge:plates/obsidian')

    // Remove immersive mills (create has an alternative, that can generate power)
    disabled_immersive_generators.forEach(item =>  {
        event.remove({output: item})
    })

    // Remove hammer based dust recipes
    const dust_recipes = event.findRecipes({ input: 'immersiveengineering:hammer' })

    dust_recipes.forEach(recipe => {
        if(recipe.getOriginalRecipeResult().item.toString().contains("dust")) {
            const ingredients = recipe.getOriginalRecipeIngredients();
            var main_ingredient;
            var out = recipe.getOriginalRecipeResult().item;

            for(const ingredient of ingredients) {
                if(!ingredient.itemStacks[0].item.toString().contains("hammer")) {
                    main_ingredient = ingredient.itemStacks[0].item
                }
            }
            if(main_ingredient) {
                event.recipes.create.milling(Item.of(out), main_ingredient)
                event.remove({ input: 'immersiveengineering:hammer', output: out })
            }
        }
    })
})