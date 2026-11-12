// QUEUE16 шаг 3: Внеземной генератор энергии хаоса LoliLand (loli_dragon_might) — мультиблок 3×3×3. Зачем: вершина лестницы
// генераторов (8 M FE/т на осколках хаоса, без взрывов). Рецепты LL (5×5 экстремального стола и 7×7 для основания/стекла/покрытия)
// сжаты до 3×3 с ключевыми деталями; предметы LL по idmap: хаотичный драконий блок/слиток → осколок/фрагмент хаоса, ядро хранилища →
// энергоядро Draconic, магниевая пластина IU, кодирующая пластина → плата t1, укреплённая иридиево-железная → quantumitems2 IU, рама supreme IF.
ServerEvents.recipes(function (e) {
  var MT = 'maelstromtech:', DE = 'draconicevolution:'
  e.shaped(MT + 'chaos_generator', ['FEF', 'CAC', 'FEF'], { F: DE + 'large_chaos_frag', E: DE + 'energy_core', C: DE + 'chaotic_core', A: DE + 'awakened_core' })
    .id('kubejs:chaos_generator/controller')
  e.shaped(MT + 'chaos_generator_chamber', ['MRM', 'RSR', 'MRM'], { M: 'industrialupgrade:itemplates/magnesium_plate', R: 'industrialupgrade:quantumitems2', S: DE + 'chaos_shard' })
    .id('kubejs:chaos_generator/chamber')
  e.shaped('4x ' + MT + 'chaos_generator_basis', ['MBM', 'BFB', 'MBM'], { M: 'industrialupgrade:itemplates/magnesium_plate', B: 'kubejs:circuit_board_t1', F: 'industrialforegoing:machine_frame_supreme' })
    .id('kubejs:chaos_generator/basis')
  e.shaped('4x ' + MT + 'chaos_generator_glass', ['QMQ', 'MRM', 'QMQ'], { Q: 'enderio:fused_quartz', M: 'industrialupgrade:itemplates/magnesium_plate', R: 'industrialupgrade:quantumitems2' })
    .id('kubejs:chaos_generator/glass')
  e.shaped('4x ' + MT + 'chaos_generator_coverage', ['NRN', 'RFR', 'NRN'], { N: 'industrialupgrade:itemplates/niobium', R: 'industrialupgrade:quantumitems2', F: 'industrialforegoing:machine_frame_supreme' })
    .id('kubejs:chaos_generator/coverage')
  console.info('[check] chaos_generator: 5 recipes')
})
