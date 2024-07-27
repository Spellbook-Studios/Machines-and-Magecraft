// priority: 0

// Visit the wiki for more info - https://kubejs.com/

StartupEvents.registry('item', event => {
    event.create("untanned_leather").displayName("Untanned Leather").texture("mm:item/untanned_leather").maxStackSize(64).tag("forge:leather/untanned")
    event.create("cured_leather").displayName("Cured Leather").texture("mm:item/cured_leather").maxStackSize(64).tag("forge:leather/cured")
})