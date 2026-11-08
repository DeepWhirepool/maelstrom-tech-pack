// T28: рецепты материалов Э3 (materials.js). Зачем: web_7 их требует, а без рецептов это тупик.
// Цепочка: кристалл → пыль / заряженный кристалл → сплавы и платы. Каждый шаг в машине другого мода.

ServerEvents.recipes(function (e) {
  var n = 0
  var K = function (id) { return 'kubejs:' + id }
  var id = function (x) { return 'kubejs:materials/' + x }

  // 1. Кристаллы. Флюорит: из самоцвета Mekanism (руда есть в мире). Хризолит и аметрин: только лазерный бур IF, редкие.
  e.custom({ type: 'mekanism:enriching', input: { count: 2, item: 'mekanism:fluorite_gem' }, output: { count: 1, id: K('fluorite_crystal') } })
    .id(id('fluorite_crystal')); n++
  ;[['chrysolite', 'green', 2], ['ametrine', 'purple', 1]].forEach(function (g) {
    e.custom({
      type: 'industrialforegoing:laser_drill_ore',
      catalyst: { item: 'industrialforegoing:' + g[1] + '_laser_lens' },
      output: { count: 1, item: K(g[0] + '_crystal') },
      rarity: [{ biome_filter: { blacklist: [], whitelist: [] }, dimension_filter: { blacklist: [], whitelist: [] }, depth_min: 0, depth_max: 255, weight: g[2] }]
    }).id(id(g[0] + '_crystal')); n++
  })

  // 2–3. Пыль: дробилка IE (шанс +1) или Mekanism. Заряженный кристалл: орб Powah, FE растёт по тиру.
  ;[['fluorite', 500000], ['chrysolite', 2000000], ['ametrine', 8000000]].forEach(function (g) {
    var c = K(g[0] + '_crystal'), d = K(g[0] + '_dust')
    e.custom({ type: 'immersiveengineering:crusher', energy: 6000, input: { item: c }, result: { item: d },
      secondaries: [{ chance: 0.5, output: { item: d } }] }).id(id(g[0] + '_dust_ie')); n++
    e.custom({ type: 'mekanism:crushing', input: { count: 1, item: c }, output: { count: 1, id: d } }).id(id(g[0] + '_dust_mek')); n++
    e.custom({ type: 'powah:energizing', energy: g[1], ingredients: [{ item: c }], result: { count: 1, id: K('energized_' + g[0] + '_crystal') } })
      .id(id('energized_' + g[0])); n++
  })

  // 4. Квантовый сплав: дуговая печь IE, иридий IU + очищенный обсидиан Mekanism + заряженный аметрин.
  e.custom({
    type: 'immersiveengineering:arc_furnace',
    input: { item: 'industrialupgrade:itemingots/iridium_ingot' },
    additives: [{ basePredicate: { item: 'mekanism:ingot_refined_obsidian' }, count: 2 }, { item: K('energized_ametrine_crystal') }],
    results: [{ item: K('quantum_alloy_ingot') }],
    energy: 409600, time: 200
  }).id(id('quantum_alloy_ingot')); n++

  // 5. Сплав хаоса: слияние Draconic (draconic), пробуждённый дракониум + нейтроний Avaritia + звёздная материя Maelstrom Tech.
  e.custom({
    type: 'draconicevolution:fusion_crafting',
    catalyst: { item: 'draconicevolution:awakened_draconium_ingot' },
    ingredients: ['avaritia:neutron_ingot', 'avaritia:neutron_ingot', 'maelstromtech:star_matter', 'maelstromtech:star_matter']
      .map(function (i) { return { consume: true, ingredient: { item: i } } }),
    result: { count: 1, id: K('chaos_alloy_ingot') },
    techLevel: 'draconic', totalEnergy: 16000000
  }).id(id('chaos_alloy_ingot')); n++

  // 6. Платы: каждая следующая содержит предыдущую + заряженный кристалл своего тира + детали двух модов.
  e.shaped(K('circuit_board_t1'), ['FIF', ' M '], { F: K('fluorite_dust'), I: 'immersiveengineering:circuit_board', M: 'mekanism:basic_control_circuit' })
    .id(id('circuit_board_t1')); n++
  e.shaped(K('circuit_board_t2'), [' X ', 'ATU'], { X: K('energized_fluorite_crystal'), A: 'enderio:energetic_alloy_ingot',
    T: K('circuit_board_t1'), U: 'industrialupgrade:circuit/advanced_part1' }).id(id('circuit_board_t2')); n++
  e.shaped(K('circuit_board_t3'), [' X ', 'LTE'], { X: K('energized_chrysolite_crystal'), L: 'ae2:logic_processor',
    T: K('circuit_board_t2'), E: 'mekanism:elite_control_circuit' }).id(id('circuit_board_t3')); n++
  e.shaped(K('circuit_board_t4'), [' X ', 'PTW'], { X: K('energized_ametrine_crystal'), P: 'ae2:engineering_processor',
    T: K('circuit_board_t3'), W: 'draconicevolution:wyvern_core' }).id(id('circuit_board_t4')); n++

  console.info('[materials] ' + n + ' recipes')
})
