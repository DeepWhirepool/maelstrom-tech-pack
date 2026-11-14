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

// T107 п.2: сырой латекс сразу становится латексом в том же количестве — краники IU и Maelstrom (логика IU, выпадает в мир),
// лут, выдача в инвентарь. Сырой латекс скрыт (ic2_keep.txt → hide_ic2); верстак 1 сырой → 1 латекс — для накопленного.
var RL_RAW = 'industrialupgrade:raw_latex', RL_LATEX = 'industrialupgrade:crafting_elements/crafting_290_element'
EntityEvents.spawned('minecraft:item', function (e) {
  var st = e.entity.item
  if (st && String(st.id) == RL_RAW) e.entity.item = Item.of(RL_LATEX, st.count)
})
PlayerEvents.inventoryChanged(RL_RAW, function (e) {
  var inv = e.player.inventory
  for (var i = 0; i < inv.containerSize; i++) { var s = inv.getItem(i); if (String(s.id) == RL_RAW) inv.setItem(i, Item.of(RL_LATEX, s.count)) }
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
  // T107 п.2 (решение пользователя): краник даёт латекс сразу, коагуляция (разливочная IE, центрифуга Oritech) убрана.
  var LATEX = RL_LATEX
  // вулканизация: латекс + сера → 2 резины (печь даёт 1) — печь-сплавитель IE (ранняя) и сплавочная печь Ender IO
  event.custom({ type: 'immersiveengineering:alloy', input0: { item: LATEX }, input1: { tag: 'c:dusts/sulfur' },
    result: { id: RUBBER, count: 2 }, time: 200 }).id('kubejs:rubber/vulcanize_ie')
  event.custom({ type: 'enderio:alloy_smelting', energy: 3200, experience: 0.1, inputs: [{ count: 1, item: LATEX }, { count: 1, tag: 'c:dusts/sulfur' }],
    output: { count: 2, id: RUBBER } }).id('kubejs:rubber/vulcanize_eio')
  console.info('[check] rubber_farm: 9 recipes')
})
