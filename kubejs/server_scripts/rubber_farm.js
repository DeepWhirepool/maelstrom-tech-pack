// Ферма каучука на станции EIO (краника/смолы в EIO 8.2.12 нет): станция сажает саженец IU (SaplingBlock) и рубит
// дерево (блочные logs/leaves уже в IU); резину и латекс дают машины из бревна. Item-теги: бревно как обычное, саженец.
var RW = ['industrialupgrade:rubber_wood/plain_y', 'industrialupgrade:swamp_rubber_wood/plain_y', 'industrialupgrade:tropical_rubber_wood/plain_y']
var RWB = ['industrialupgrade:rubber_wood', 'industrialupgrade:swamp_rubber_wood', 'industrialupgrade:tropical_rubber_wood']
var SAP = 'industrialupgrade:sapling/rubber_sapling', RUBBER = 'industrialupgrade:crafting_elements/crafting_271_element'

ServerEvents.tags('item', function (e) {
  RW.forEach(function (id) { e.add('minecraft:logs', id); e.add('minecraft:logs_that_burn', id) })
  e.add('minecraft:saplings', SAP)
})
ServerEvents.tags('block', function (e) {
  RWB.forEach(function (id) { e.add('minecraft:logs_that_burn', id) })
})

ServerEvents.recipes(function (event) {
  var N = ['log', 'swamp_log', 'tropical_log']
  // экстрактор IU, как IC2: каучуковое дерево (3 вида) → резина, саженец → резина
  ;RW.map(function (id, i) { return [id, N[i]] }).concat([[SAP, 'sapling']]).forEach(function (m) {
    event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: 'extractor', isFluidRecipe: false,
      inputs: [{ type: 'item', id: m[0], amount: 1 }], outputs: [{ type: 'item', id: RUBBER, amount: 1 }], params: {} })
      .id('kubejs:rubber/extractor_' + m[1])
  })
  // IF сравнивает ItemStack(state.getBlock()) = единственный BlockItem `.../plain_y` → все состояния plain/dry/wet; стрипа нет → воздух
  RW.forEach(function (id, i) {
    event.custom({ type: 'industrialforegoing:fluid_extractor', breakChance: 0.01, defaultRecipe: false,
      input: { item: id }, output: { amount: 2, id: 'industrialforegoing:latex' }, result: { Name: 'minecraft:air' } })
      .id('kubejs:rubber/latex_' + N[i])
  })
  console.info('[check] rubber_farm: 7 recipes')
})
