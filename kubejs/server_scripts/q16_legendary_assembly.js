// QUEUE16 шаг 4: Легендарный сборочный комплекс LoliLand (HiTech-Elements MTLegendaryAssemblyComplex) — мультиблок 5×5×5 и его рецепты.
// Зачем: в LL через него идёт «Улучшение: Квантовый генератор»; у нас он ещё и обязательная веха финала — квантовые генераторы 0–3
// собираются только в нём (рецепты ll_top.js на экстремальном столе убраны, входы те же). Мана и газ LL → тёмный энергоний (без магии).
// Сетки квантовых генераторов в ll_top.js не пишутся (gen_ll_top.py, QUEUE16).
ServerEvents.recipes(function (e) {
  var MT = 'maelstromtech:', DE = 'draconicevolution:', AV = 'avaritia:', n = 0
  // блоки структуры (своих рецептов в LL-данных нет — ключевые детали эндгейма, допущение)
  e.shaped(MT + 'legendary_assembly_complex', ['NSN', 'CTC', 'NSN'], { N: AV + 'neutron_ingot', S: MT + 'star_core', C: DE + 'chaotic_core', T: AV + 'extreme_crafting_table' })
    .id('kubejs:legendary/controller'); n++
  e.shaped('8x ' + MT + 'legendary_casing', ['PDP', 'DFD', 'PDP'], { P: 'industrialupgrade:quantumitems2', D: DE + 'awakened_draconium_ingot', F: 'industrialforegoing:machine_frame_supreme' })
    .id('kubejs:legendary/casing'); n++
  e.shaped('8x ' + MT + 'legendary_glass', ['QQQ', 'QDQ', 'QQQ'], { Q: 'enderio:fused_quartz', D: DE + 'awakened_draconium_ingot' })
    .id('kubejs:legendary/glass'); n++
  e.shaped(MT + 'legendary_core', ['SXS', 'XCX', 'SXS'], { S: MT + 'star_core', X: AV + 'crystal_matrix_ingot', C: DE + 'chaotic_core' })
    .id('kubejs:legendary/core'); n++

  var LA = function (out, ings, mb, fe, minutes) {
    e.custom({ type: 'maelstromtech:legendary_assembly', ingredients: ings.map(function (x) { return { ingredient: { item: x[0] }, count: x[1] } }),
      fluid: { id: 'maelstromtech:dark_energonium', amount: mb }, result: { id: out, count: 1 }, energy: fe, ticks: minutes * 1200 })
      .id('kubejs:legendary/' + out.split(':')[1]); n++
  }
  // LL upgrade_quantum_generator: 4 панели + 4 ядра тиров, 8 сингулярностей, 8 продв. хаотичных ядер (→ хаотичное ядро DE), 2 флуктуационные;
  // LL 100M EU (=400M FE) + мана/дейтерий по 100 000 → 20 000 мБ энергония; 15 мин
  LA(MT + 'quantum_generator_upgrade', [[MT + 'aberration_solar_panel', 1], ['kubejs:aberration_core', 1], [MT + 'parametric_solar_panel', 1], ['kubejs:parametric_core', 1],
    [MT + 'chronodynamic_solar_panel', 1], ['kubejs:chromodynamic_core', 1], [MT + 'antimaterial_solar_panel', 1], ['kubejs:antimaterial_core', 1],
    [AV + 'singularity', 8], [DE + 'chaotic_core', 8], [MT + 'fluctuation_solar_panel', 2]], 20000, 400000000, 15)
  // квантовые генераторы 0–3: входы рецептов ll_top (LL 0–3qgen), 10/12/15/20 мин, 1/2/4/8 G FE
  LA(MT + 'quantum_generator_0', [[AV + 'neutron', 11], [DE + 'awakened_draconium_block', 19], [AV + 'singularity', 16], [AV + 'eternal_singularity', 4],
    ['kubejs:sparkling_core', 1], ['kubejs:chaos_alloy_ingot', 8], ['enderio:pulsating_crystal', 4], [MT + 'eu_generator_5', 1], [AV + 'infinity', 8],
    [DE + 'dragon_heart', 4], [MT + 'charged_neutron_star', 4], [MT + 'sparkling_rose_gold_panel', 1]], 8000, 1000000000, 10)
  LA(MT + 'quantum_generator_1', [[AV + 'neutron', 11], ['kubejs:chrysolite_crystal', 16], [AV + 'singularity', 16], [MT + 'star_core', 4], ['kubejs:sparkling_core', 1],
    [AV + 'infinity_nugget', 8], ['kubejs:chaos_alloy_ingot', 4], [AV + 'eternal_singularity', 8], [DE + 'dragon_heart', 4],
    [MT + 'liquid_singularity_quantum_alloy', 4], [MT + 'charged_neutron_star', 4], [MT + 'quantum_generator_0', 1]], 16000, 2000000000, 12)
  LA(MT + 'quantum_generator_2', [[AV + 'neutron', 11], ['immersiveengineering:storage_electrum', 16], [AV + 'singularity', 12], ['kubejs:chaos_alloy_ingot', 16],
    ['kubejs:sparkling_core', 1], [MT + 'charged_neutron_star', 8], [MT + 'star_core', 8], [DE + 'dragon_heart', 4], ['kubejs:circuit_board_t3', 4],
    [MT + 'quantum_generator_1', 1]], 32000, 4000000000, 15)
  LA(MT + 'quantum_generator_3', [[AV + 'neutron', 11], ['kubejs:ametrine_crystal', 16], [AV + 'singularity', 12], [MT + 'star_core', 4], ['kubejs:sparkling_core', 1],
    [MT + 'dragon_slayer_ultimate_panel', 1], ['kubejs:chaos_alloy_ingot', 29], [MT + 'multiallow_ultimate_electrolyzed_panel', 1],
    [MT + 'ultimate_dimension_traveler_panel', 1], [MT + 'ultimate_holographic_thermodynamic_panel', 1], [MT + 'ultimate_four_color_beekeeper_panel', 1],
    ['ae2:creative_energy_cell', 1], [MT + 'quantum_generator_2', 1], [MT + 'antimaterial_solar_panel', 1]], 64000, 8000000000, 20)
  console.info('[check] legendary_assembly: ' + n + ' recipes')
})
