// T25: паутина web_7, часть 1 — рецепты машин и предметов мода Maelstrom Tech.
//
// Зачем: цепочка энергона/звёзд должна стоять на эндгейме других модов. Каждая машина — детали минимум 3 модов
// + предыдущая машина цепочки (зарядник → генераторы → преобразователь → синтезатор → Гелиосфера → Термоядерный комплекс).
// Плазмореактивы-капсулы чередуют Mekanism PRC и Draconic fusion, тир растёт вместе с тиром fusion.
// Временные верстачные рецепты из jar мода удаляются здесь же (блок звёздной материи 9↔1 остаётся).
// Форматы: mekanism:reaction и draconicevolution:fusion_crafting взяты из jar модов, id — из local/kubejs/dump_items.txt.

// Mekanism PRC принимает жидкость по тегу (так в jar), поэтому энергоний кладём в теги
ServerEvents.tags('fluid', function (e) {
  e.add('c:red_energonium', 'maelstromtech:red_energonium')
  e.add('c:dark_energonium', 'maelstromtech:dark_energonium')
})

ServerEvents.recipes(function (e) {
  var n = 0
  var L = function (id) { return 'maelstromtech:' + id }
  var rep = function (x, k) { var a = []; for (var i = 0; i < k; i++) a.push(x); return a }
  var shaped = function (out, count, pattern, key) { e.shaped(Item.of(L(out), count), pattern, key).id('kubejs:web_7/' + out); n++ }
  var fusion = function (out, catalyst, ings, tech, energy) {
    e.custom({
      type: 'draconicevolution:fusion_crafting',
      catalyst: { item: catalyst },
      ingredients: ings.map(function (i) { return { consume: true, ingredient: { item: i } } }),
      result: { count: 1, id: L(out) },
      techLevel: tech,
      totalEnergy: energy
    }).id('kubejs:web_7/' + out); n++
  }
  var prc = function (out, item, fluidTag, chemical, chemAmount) {
    e.custom({
      type: 'mekanism:reaction',
      item_input: { count: 1, item: item },
      fluid_input: { amount: 250, tag: fluidTag },
      chemical_input: { amount: chemAmount, chemical: chemical },
      item_output: { count: 1, id: L(out) },
      duration: 200,
      energy_required: 20000
    }).id('kubejs:web_7/' + out); n++
  }

  // временные рецепты мода
  ;['plasma_charger', 'red_energon_generator', 'dark_energon_generator', 'speed_upgrade', 'converter_casing', 'converter_glass',
    'energonium_converter', 'energon_synthesizer', 'helio_casing', 'helio_grate', 'helio_lamp', 'heliospheric_charging_center',
    'induction_module_1', 'induction_module_2', 'induction_module_3', 'induction_module_4', 'thermal_insulator_1', 'thermal_insulator_2',
    'thermal_insulator_3', 'star_core', 'plasma_reagent_phase', 'plasma_reagent_heliotrope', 'plasma_reagent_luminophase',
    'plasma_reagent_exothermic', 'plasma_reagent_quark', 'thermo_casing', 'thermo_roof', 'thermo_glass', 'thermo_heater',
    'thermonuclear_melting_complex', 'smelting_crystallizer', 'smelter_crucible', 'liquid_neutron_compressor'].forEach(function (id) { e.remove({ id: L(id) }) })

  // Нейтронная звезда: нейтроний Avaritia + квантовый сплав (T15) + антиматерия Mekanism (SPS)
  // T37: один нейтроний → радиоактивный компонент. T107: торий IU скрыт (циклотрон IU вне сборки) → полониевая гранула Mekanism (реактор деления)
  shaped('neutron_star', 1, ['NQN', 'QAQ', 'NTN'], { N: 'avaritia:neutron_ingot', Q: 'kubejs:quantum_alloy_ingot', A: 'mekanism:pellet_antimatter',
    T: 'mekanism:pellet_polonium' })
  // T38: второй путь к нейтронию без долгого таймера коллектора — PRC за 10 с, скорость упирается в плутоний и энергию
  e.custom({
    type: 'mekanism:reaction',
    item_input: { count: 1, item: 'mekanism:pellet_plutonium' },
    fluid_input: { amount: 1000, tag: 'minecraft:water' },
    chemical_input: { amount: 1000, chemical: 'mekanism:hydrogen' },
    item_output: { count: 1, id: 'avaritia:neutron_nugget' },
    duration: 200,
    energy_required: 20000
  }).id('kubejs:web_7/neutron_nugget_prc'); n++

  // Плазмореактивы: тир 1 и 3 — PRC Mekanism, тир 2/4/5 — fusion Draconic wyvern/draconic/chaotic
  prc('plasma_reagent_phase', 'mekanism:pellet_plutonium', 'c:red_energonium', 'mekanism:hydrogen', 1000)
  fusion('plasma_reagent_heliotrope', L('plasma_reagent_phase'), ['industrialupgrade:itemsunnarium/sunnarium2', 'industrialupgrade:itemsunnarium/sunnarium2',
    'kubejs:energized_ametrine_crystal', 'kubejs:energized_ametrine_crystal'], 'wyvern', 4000000)
  prc('plasma_reagent_luminophase', L('plasma_reagent_heliotrope'), 'c:dark_energonium', 'mekanism:antimatter', 100)
  fusion('plasma_reagent_exothermic', L('plasma_reagent_luminophase'), ['draconicevolution:awakened_draconium_ingot', 'draconicevolution:awakened_draconium_ingot',
    'powah:crystal_nitro', 'powah:crystal_nitro'], 'draconic', 16000000)
  // кварковый: кристалл перезарядки Oritech делается только в ускорителе частиц
  fusion('plasma_reagent_quark', L('plasma_reagent_exothermic'), rep('oritech:overcharged_crystal', 4), 'chaotic', 64000000)

  // Звёздное ядро: пробуждённое ядро Draconic + кристаллы Синтезатора + сплав хаоса (T15)
  fusion('star_core', 'draconicevolution:awakened_core', rep(L('pulsing_energon_crystal'), 4).concat(rep('kubejs:chaos_alloy_ingot', 4)),
    'chaotic', 128000000)

  // Апгрейд ускорения: ускоритель Mekanism + оверклокер IU + плата T15
  shaped('speed_upgrade', 1, [' S ', 'OKO', ' S '], { S: 'mekanism:upgrade_speed', O: 'industrialupgrade:upgrades/overclocker', K: 'kubejs:circuit_board_t3' })

  // Машины цепочки: каждая содержит предыдущую
  shaped('plasma_charger', 1, ['AWA', 'CEC', 'AQA'], { A: 'mekanism:alloy_atomic', W: 'draconicevolution:wyvern_core', C: 'kubejs:circuit_board_t4',
    E: 'mekanism:ultimate_energy_cube', Q: 'mekanism:qio_drive_hyper_dense' }) // T107: квантовое хранилище IU скрыто → QIO-диск Mekanism (тоже «квантовое»)
  shaped('red_energon_generator', 1, ['OSO', 'CPC', 'OLO'], { O: 'mekanism:ingot_refined_obsidian', S: 'industrialupgrade:itemsunnarium/sunnarium_plate',
    C: 'kubejs:circuit_board_t3', P: L('plasma_charger'), L: 'minecraft:magma_block' })
  shaped('dark_energon_generator', 1, ['OSO', 'CPC', 'OLO'], { O: 'mekanism:ingot_refined_obsidian', S: 'industrialupgrade:cryogenic_cooling_mixture',
    C: 'kubejs:circuit_board_t3', P: L('plasma_charger'), L: 'minecraft:blue_ice' })
  shaped('energonium_converter', 1, ['CRC', 'KUK', 'CDC'], { C: L('converter_casing'), R: L('red_energon_generator'), D: L('dark_energon_generator'),
    K: 'kubejs:circuit_board_t4', U: 'mekanism:ultimate_control_circuit' })
  // T102: синтезатор и плавильня — на своих корпусах
  shaped('energon_synthesizer', 1, ['CXC', 'KEK', 'CXC'], { C: L('synth_casing'), X: 'draconicevolution:wyvern_energy_core', K: 'kubejs:circuit_board_t4',
    E: L('energonium_converter') })
  shaped('heliospheric_charging_center', 1, ['HAH', 'SYS', 'HQH'], { H: L('helio_casing'), A: 'draconicevolution:awakened_core', S: L('star_matter_block'),
    Y: L('energon_synthesizer'), Q: 'avaritia:crystal_matrix_ingot' })
  // T66: как в LoliLand, Термояду нужна плавильня -> Плавильно-кристаллизационный комплекс вместо одной из антиматерий
  shaped('thermonuclear_melting_complex', 1, ['TCT', 'MHS', 'TNT'], { T: L('thermo_casing'), C: 'draconicevolution:chaotic_core', M: 'mekanism:pellet_antimatter',
    H: L('heliospheric_charging_center'), N: 'avaritia:neutron_ingot', S: L('smelting_crystallizer') })
  // T66: комплекс — после Преобразователя (его корпус/стекло), до Термояда: доменная печь IE-уровня + Mekanism + IU
  shaped('smelting_crystallizer', 1, ['CHC', 'RKR', 'CBC'], { C: L('smelter_casing'), H: 'mekanism:resistive_heater', R: 'immersiveengineering:plate_steel',
    K: 'kubejs:circuit_board_t3', B: 'mekanism:basic_fluid_tank' })
  // T67: жидкостный компрессор — эндгейм после Термояда: нейтронный компрессор Avaritia + бак Mekanism + кристалл энергона
  shaped('liquid_neutron_compressor', 1, ['NTN', 'PXP', 'NAN'], { N: 'avaritia:neutron_ingot', T: 'mekanism:ultimate_fluid_tank',
    P: L('pulsing_energon_crystal'), X: 'avaritia:neutron_compressor', A: 'mekanism:pellet_antimatter' })
  shaped('smelter_crucible', 1, ['SOS', 'OCO', 'SOS'], { S: 'immersiveengineering:plate_steel', O: 'mekanism:ingot_refined_obsidian', C: 'minecraft:cauldron' })

  // Корпуса и стёкла: дёшево (×4–8), 2–3 мода; каждый следующий корпус на базе предыдущего
  shaped('converter_casing', 8, ['SXS', 'XCX', 'SXS'], { S: 'immersiveengineering:plate_steel', X: 'powah:dielectric_paste', C: 'mekanism:steel_casing' })
  shaped('converter_glass', 8, ['GAG', 'APA', 'GAG'], { G: 'mekanism:structural_glass', A: 'ae2:quartz_glass', P: 'powah:dielectric_paste' })
  // T102: свои корпус/стекло Плавильни и Синтезатора — цепочкой от корпуса Преобразователя + деталь своей ступени,
  // каждая следующая структура в 2–4 раза дороже: плавильня — усиленный сплав + хризолит (S3), синтезатор — атомный сплав
  // + заряженный аметрин (S4). Стекло — прошлое стекло + усиливающая деталь.
  shaped('smelter_casing', 4, ['ACA', 'CHC', 'ACA'], { A: 'mekanism:alloy_reinforced', C: L('converter_casing'), H: 'kubejs:chrysolite_crystal' })
  shaped('smelter_glass', 4, ['GIG', 'IKI', 'GIG'], { G: L('converter_glass'), I: 'immersiveengineering:insulating_glass', K: 'kubejs:chrysolite_crystal' })
  shaped('synth_casing', 4, ['ACA', 'CEC', 'ACA'], { A: 'mekanism:alloy_atomic', C: L('smelter_casing'), E: 'kubejs:energized_ametrine_crystal' })
  shaped('synth_glass', 4, ['GAG', 'AEA', 'GAG'], { G: L('smelter_glass'), A: 'mekanism:alloy_atomic', E: 'kubejs:energized_ametrine_crystal' })
  shaped('helio_casing', 8, ['DND', 'NCN', 'DND'], { D: 'draconicevolution:draconium_ingot', N: 'enderio:dark_steel_ingot', C: L('converter_casing') })
  shaped('helio_grate', 4, ['HBH', 'B B', 'HBH'], { H: L('helio_casing'), B: 'enderio:dark_steel_bars' })
  shaped('helio_lamp', 4, ['GSG', 'S S', 'GSG'], { G: L('converter_glass'), S: 'powah:crystal_spirited' })
  shaped('thermo_casing', 8, ['AOA', 'OHO', 'AOA'], { A: 'mekanism:alloy_atomic', O: 'oritech:fluxite', H: L('helio_casing') })
  shaped('thermo_roof', 4, ['TQT', 'Q Q', 'TQT'], { T: L('thermo_casing'), Q: 'ae2:quartz_block' })
  shaped('thermo_glass', 8, ['GGG', 'GFG', 'GGG'], { G: L('converter_glass'), F: 'oritech:fluxite' })
  shaped('thermo_heater', 1, ['BCB', 'RHR', 'BCB'], { B: 'powah:crystal_blazing', C: L('thermo_casing'), R: 'mekanism:resistive_heater',
    H: 'immersiveengineering:furnace_heater' })

  // Термоизоляторы: каждый следующий содержит предыдущий
  shaped('thermal_insulator_1', 1, ['ABA', 'BCB', 'ABA'], { A: 'mekanism:hdpe_sheet', B: 'immersiveengineering:insulating_glass', C: 'industrialupgrade:cryogenic_cooling_mixture' })
  shaped('thermal_insulator_2', 1, ['ABA', 'BIB', 'ABA'], { A: 'mekanism:alloy_atomic', B: 'powah:crystal_nitro', I: L('thermal_insulator_1') })
  shaped('thermal_insulator_3', 1, ['ABA', 'BIB', 'ABA'], { A: 'draconicevolution:awakened_draconium_ingot', B: 'avaritia:neutron_ingot', I: L('thermal_insulator_2') })

  // Индукционные модули Гелиосферы: тир растёт, каждый содержит предыдущий
  shaped('induction_module_1', 1, ['AHA', 'HCH', 'AHA'], { A: 'mekanism:alloy_reinforced', H: L('helio_casing'), C: 'immersiveengineering:coil_hv' })
  shaped('induction_module_2', 1, ['ABA', 'BMB', 'ABA'], { A: 'mekanism:alloy_atomic', B: 'powah:crystal_blazing', M: L('induction_module_1') })
  shaped('induction_module_3', 1, ['ABA', 'BMB', 'ABA'], { A: 'draconicevolution:awakened_draconium_ingot', B: 'powah:crystal_nitro', M: L('induction_module_2') })
  shaped('induction_module_4', 1, ['ABA', 'BMB', 'ABA'], { A: 'avaritia:neutron_ingot', B: 'oritech:overcharged_crystal', M: L('induction_module_3') })

  console.info('[web_7] ' + n + ' recipes')
})

// T37: эндгейм Draconic + Avaritia. Осколок хаоса — дроп модового босса (Хаос-страж), по правилам сборки
// заменён техническим слиянием; фрагменты получаются из осколка рецептами мода (decompress).
// Chaotic-снаряжение + нейтронная звезда: она дешевле звёздного ядра (4 нейтрония + 4 квант. сплава + антиматерия
// против слияния с 4 пульсирующими энергонами и 4 хаос-сплавами).
ServerEvents.recipes(function (e) {
  var n = 0
  e.custom({
    type: 'draconicevolution:fusion_crafting',
    catalyst: { item: 'draconicevolution:dragon_heart' },
    ingredients: ['kubejs:chaos_alloy_ingot', 'maelstromtech:star_matter', 'maelstromtech:star_matter',
      'kubejs:energized_ametrine_crystal', 'kubejs:energized_ametrine_crystal'].map(function (i) { return { consume: true, ingredient: { item: i } } }),
    result: { count: 1, id: 'draconicevolution:chaos_shard' },
    techLevel: 'draconic',
    totalEnergy: 32000000
  }).id('kubejs:web_7/chaos_shard'); n++
  var add = function (id, item) {
    e.forEachRecipe({ id: id }, function (r) {
      var ings = r.json.getAsJsonArray('ingredients'), fusion = String(r.json.get('type').getAsString()).indexOf('fusion') >= 0
      ings.add(JsonIO.parseRaw(JSON.stringify(fusion ? { consume: true, ingredient: { item: item } } : { item: item })))
      r.save(); n++
    })
  }
  ;['chestpiece', 'sword', 'axe', 'shovel', 'pickaxe', 'hoe', 'bow', 'staff', 'staff_alt'].forEach(function (t) {
    add('draconicevolution:tools/chaotic_' + t, 'maelstromtech:neutron_star')
  })
  // Avaritia: катализатор бесконечности (оба рецепта) + звёздное ядро; нейтронный коллектор — абсолютная схема Mekanism
  // вместо одного железного блока. Экстремальный верстак (+ плата t4) — в web_1_casings.js, рецепт заменён там.
  add('avaritia:infinity_catalyst', 'maelstromtech:star_core')
  add('avaritia:infinity_catalyst_eternal', 'maelstromtech:star_core')
  e.forEachRecipe({ id: 'avaritia:neutron_collector' }, function (r) { webSetCell(r, 0, 0, 'mekanism:ultimate_control_circuit'); n++ })
  console.info('[web_7] endgame ' + n + ' recipes')
})
