// T83: молекулярный преобразователь IU возвращён (S3, перед гибридной панелью — как в LoliLand).
// Энергия — как в LoliLand (EU = EF IU; 1 EF = 4 FE). Время = FE / (FE в тик) / 20 с.
var MT_U = function (s) { return 'industrialupgrade:' + s }

ServerEvents.recipes(function (event) {
  // крафт блока по LoliLand: улучшенный корпус, ниобиевая микросхема -> плата т2, EV-трансформатор;
  // ядро преобразователя LL (облучённое стекло + отражатели + око Края) -> ядро телепортации Mekanism (S3, жемчуг Края внутри)
  event.remove({ id: 'industrialupgrade:industrialupgrade_1536' })
  event.shaped(MT_U('molecular/molecular'), ['ABA', 'CDC', 'ABA'], {
    A: MT_U('blockresource/advanced_machine'), B: 'kubejs:circuit_board_t2', C: MT_U('transformer_iu/ev'), D: 'mekanism:teleportation_core'
  }).id('kubejs:molecular/transformer')

  // превращения LoliLand, имеющие смысл в паке: [вход, кол-во, выход, кол-во, EF]
  ;[
    ['minecraft:glowstone', 1, MT_U('itemsunnarium/sunnarium2'), 1, 9e6],          // санариум: единственный путь, как в LL (36 млн FE)
    ['minecraft:glowstone_dust', 1, MT_U('itemsunnarium/sunnariumpart'), 1, 1e6],  // частица санариума: второй путь к Powah energizing
    ['minecraft:iron_block', 1, MT_U('crafting_elements/crafting_291_element'), 1, 9e6] // иридий из железа (LL: железный блок -> иридиевая руда)
  ].forEach(function (r, i) {
    event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: 'molecular', isFluidRecipe: false,
      inputs: [{ type: 'item', id: r[0], amount: r[1] }], outputs: [{ type: 'item', id: r[2], amount: r[3] }],
      params: { energy: r[4] } }).id('kubejs:molecular/ll_' + i)
  })

  // встроенные рецепты IU со скрытыми предметами (ядра IU, линзы, фотоний, протон, каравкий) — убрать из JEI и машины
  ;['reactors/proton', 'itemingots/caravky_ingot', 'photoniy_ingot', 'photoniy', 'crafting_elements/crafting_645_element',
    'crafting_elements/crafting_275_element'].concat(
    ['adv', 'hyb', 'ult', 'spe', 'pro', 'sin', 'adm', 'pho', 'neu', 'bar', 'adr', 'gra', 'kvr'].map(function (c) { return 'itemcore/' + c + 'core' }),
    ['sun', 'rain', 'nether', 'night', 'earth', 'end', 'aer'].map(function (l) { return 'lens/' + l + 'linse' })
  ).forEach(function (o, i) {
    event.custom({ type: 'industrialupgrade:universal_recipe_delete', recipe_type: 'molecular', isFluidRecipe: false,
      output: [{ type: 'item', id: MT_U(o), amount: 1 }], isRemoveAll: true }).id('kubejs:molecular/del_' + i)
  })
  console.info('[molecular] transformer + 3 LL recipes')
})
