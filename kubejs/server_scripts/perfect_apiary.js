// QUEUE16 шаг 2: Совершенная пасека LoliLand (loli_forestry:IndustrialApiary) — корпус, пасека, 7 улучшений. Зачем: в LL пасека-фабрика
// делает продукцию пчёл для пчеловодческих панелей (ll_progression 3.1). Предметы LL заменены по idmap.json: оцинкованный ниобиевый лист →
// пластина ниобия IU, четырёхцветная рамка → пульсирующий фотомодуль Ender IO, микросхемы/чипы ниобия → наши платы, блок розового золота →
// блок электрума IE, сотовая пластина LL → наша сотовая пластина (её делает только сама пасека: 8 сот → 1 пластина), лампы Forestry — как есть.
// Сетки LL 9×9/«сборочный стол» сжаты до 3×3 с теми же ключевыми деталями (допущение).
ServerEvents.recipes(function (e) {
  var MT = 'maelstromtech:'
  // корпус: блоки электрума, прочные корпуса Forestry, заряженные чипы, четырёхцветная рамка (LL HiTech_GenDustry frame_perfect_apiary)
  e.shaped(MT + 'perfect_apiary_frame', ['ESE', 'CFC', 'ESE'], {
    E: '#c:storage_blocks/electrum', S: 'forestry:sturdy_casing', C: 'kubejs:circuit_board_t3', F: 'enderio:pulsating_photovoltaic_module'
  }).id('kubejs:perfect_apiary/frame')
  // пасека: ниобиевые листы, 2 корпуса, микросхемы (LL Hitech_bee_factory IndustrialApiary); допущение: вместо 8 катализаторов бесконечности
  // LL — пасека Forestry в центре, иначе пчеловодческие панели (сразу после дисперсионной) уходят за финал Avaritia
  e.shaped(MT + 'perfect_apiary', ['NFN', 'CAC', 'NFN'], {
    N: 'industrialupgrade:itemplates/niobium', F: MT + 'perfect_apiary_frame', C: 'kubejs:circuit_board_t3', A: 'forestry:apiary'
  }).id('kubejs:perfect_apiary/apiary')
  // улучшения (LL loli_forestry:upgrade_speed 0–2, upgrade_luck, upgrade_infinity; автовывод/климат — gendustry ApiaryUpgrade)
  e.shaped(MT + 'apiary_upgrade_speed_1', ['TRT', 'CBC', 'TRT'], {
    T: 'forestry:diamantine_electron_tube', R: 'immersiveengineering:ingot_electrum', C: 'kubejs:circuit_board_t2', B: MT + 'honeycomb_plate'
  }).id('kubejs:perfect_apiary/speed_1')
  e.shaped(MT + 'apiary_upgrade_speed_2', ['TRT', 'CBC', 'TRT'], {
    T: 'forestry:emerald_electron_tube', R: 'immersiveengineering:ingot_electrum', C: 'kubejs:circuit_board_t2', B: MT + 'apiary_upgrade_speed_1'
  }).id('kubejs:perfect_apiary/speed_2')
  e.shaped(MT + 'apiary_upgrade_speed_3', ['TRT', 'CBC', 'TRT'], {
    T: 'forestry:blazing_electron_tube', R: '#c:storage_blocks/electrum', C: 'kubejs:circuit_board_t3', B: MT + 'apiary_upgrade_speed_2'
  }).id('kubejs:perfect_apiary/speed_3')
  e.shaped(MT + 'apiary_upgrade_luck', ['HIH', 'CFC', 'HIH'], {
    H: MT + 'honeycomb_plate', I: 'avaritia:infinity_ingot', C: 'kubejs:circuit_board_t3', F: MT + 'perfect_apiary_frame'
  }).id('kubejs:perfect_apiary/luck')
  e.shaped(MT + 'apiary_upgrade_infinity', ['TJT', 'CFC', 'TJT'], {
    T: 'mekanism:elite_fluid_tank', J: 'forestry:royal_jelly', C: 'kubejs:circuit_board_t3', F: MT + 'perfect_apiary_frame'
  }).id('kubejs:perfect_apiary/infinity')
  e.shaped(MT + 'apiary_upgrade_eject', ['TPT', 'CHC', 'TPT'], {
    T: 'forestry:diamantine_electron_tube', P: 'minecraft:hopper', C: 'kubejs:circuit_board_t2', H: MT + 'honeycomb_plate'
  }).id('kubejs:perfect_apiary/eject')
  e.shaped(MT + 'apiary_upgrade_climate', ['TIT', 'CHC', 'TMT'], {
    T: 'forestry:emerald_electron_tube', I: 'minecraft:blue_ice', M: 'minecraft:magma_block', C: 'kubejs:circuit_board_t2', H: MT + 'honeycomb_plate'
  }).id('kubejs:perfect_apiary/climate')
  console.info('[check] perfect_apiary: 9 recipes')
})
