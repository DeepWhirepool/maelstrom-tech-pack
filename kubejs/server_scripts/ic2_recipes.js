// IC2-набор на базе IU (10.11): рецепты в стиле IC2 2.2 + ASP для предметов из _ai/ic2_keep.txt (описание — _ai/IC2_SET.md).
// Верстак: старые рецепты с этими выходами удаляются, ставятся новые. Машины IU — датапак-рецепты universal_recipe(_delete) (IU_AUDIT §6).
// Металлы — теги c:*. Замены: железная печь → minecraft:furnace, капсула → ведро/лёд.
var U = function (s) { return 'industrialupgrade:' + s }
var CASE = U('blockresource/machine'), ACASE = U('blockresource/advanced_machine'), CIR = U('crafting_elements/crafting_272_element'),
  ACIR = U('crafting_elements/crafting_273_element'), ALLOY = U('crafting_elements/crafting_274_element'), CPL = U('crafting_elements/crafting_282_element'),
  IRID = U('crafting_elements/crafting_291_element'), IPL = U('crafting_elements/crafting_285_element'), COIL = U('crafting_elements/crafting_294_element'),
  MOTOR = U('crafting_elements/crafting_276_element'), RUBBER = U('crafting_elements/crafting_271_element'), RGLASS = U('glass/reinforced'),
  RE = U('battery/re_battery'), ARE = U('battery/advanced_re_battery'), EC = U('battery/energy_crystal'), LAP = U('battery/lapotron_crystal'),
  CU1 = U('wiring/copper1'), TIN1 = U('wiring/tin1'), AU1 = U('wiring/gold1'), FE1 = U('wiring/iron1'), GEN = U('basemachine3/generator_iu'),
  SUN = U('itemsunnarium/sunnarium2'), ESUN = U('itemsunnarium/sunnarium_enriched'), PLANK = '#minecraft:planks',
  PFE = '#c:plates/iron', IFE = '#c:ingots/iron', ICU = '#c:ingots/copper', GLOW = 'minecraft:glowstone_dust', RED = 'minecraft:redstone'

// [выход, кол-во, сетка, ключ]; сетка из одной строки без пробелов и ключ-массив = shapeless
var IC2_SHAPED = [
  // машины
  ['simplemachine/macerator_iu', 1, ['FFF', 'SMS', ' C '], { F: 'minecraft:flint', S: 'minecraft:cobblestone', M: CASE, C: CIR }],
  ['simplemachine/compressor_iu', 1, ['S S', 'SMS', 'SCS'], { S: 'minecraft:stone', M: CASE, C: CIR }],
  ['simplemachine/extractor_iu', 1, ['TMT', 'TCT'], { T: U('tools/treetap'), M: CASE, C: CIR }],
  ['simplemachine/furnace_iu', 1, [' C ', 'RFR', ' M '], { C: CIR, R: RED, F: 'minecraft:furnace', M: CASE }],
  ['simplemachine/recycler_iu', 1, [' G ', 'DCD', 'IDI'], { G: GLOW, D: 'minecraft:dirt', C: U('simplemachine/compressor_iu'), I: IFE }],
  ['moremachine2/rolling', 1, [' C ', 'OMO'], { C: CIR, O: COIL, M: CASE }], // ≈ металлоформер
  ['moremachine3/orewashing', 1, ['PPP', 'BMB', 'ECE'], { P: PFE, B: 'minecraft:bucket', M: CASE, E: MOTOR, C: CIR }],
  ['moremachine3/centrifuge_iu', 1, ['COC', 'EAE', 'CCC'], { C: ICU, O: COIL, E: MOTOR, A: ACASE }], // ≈
  ['basemachine3/rolling_machine', 1, ['PPP', 'ISI', 'LLL'], { P: PFE, I: IFE, S: 'minecraft:piston', L: PLANK }], // примитивный: валки + поршень на деревянной станине (вместо crafting_164)
  ['basemachine3/canner_iu', 1, ['TCT', 'TMT', 'TTT'], { T: U('casing/tin'), C: CIR, M: CASE }],
  // генераторы
  ['basemachine3/generator_iu', 1, ['B', 'M', 'F'], { B: RE, M: CASE, F: 'minecraft:furnace' }],
  ['basemachine3/geogenerator_iu', 1, ['GBG', 'GBG', 'IgI'], { G: 'minecraft:glass', B: 'minecraft:bucket', g: GEN, I: U('casing/iron') }],
  ['basemachine3/simple_water_generator', 1, ['SPS', 'PgP', 'SPS'], { S: 'minecraft:stick', P: PLANK, g: GEN }],
  ['basemachine3/simple_wind_generator', 1, ['I I', ' g ', 'I I'], { I: IFE, g: GEN }],
  ['rotor/rotor_wood', 1, ['LSL', 'SIS', 'LSL'], { L: '#minecraft:logs', S: 'minecraft:stick', I: IFE }],
  ['rotor/rotor_iron', 1, ['PIP', 'IBI', 'PIP'], { P: PFE, I: IFE, B: 'minecraft:iron_block' }],
  // T88: лестница роторов IU до иридиевого — верстаком вместо сборщика роторов (лопасти + ядра ветра IU скрыты);
  // каждый следующий из прошлого ротора + металл тира. Углеродный (ур. 5) и иридиевый (6) встают только в продвинутый ветряк (5–8)
  ['rotor/rotor_bronze', 1, ['PIP', 'IRI', 'PIP'], { P: U('itemplates/bronze_plate'), I: '#c:ingots/bronze', R: U('rotor/rotor_wood') }],
  ['rotor/rotor_steel', 1, ['PCP', 'CRC', 'PCP'], { P: '#c:plates/steel', C: U('casing/steel'), R: U('rotor/rotor_iron') }],
  ['rotor/rotor_carbon', 1, ['CPC', 'PRP', 'CPC'], { C: CPL, P: '#c:plates/steel', R: U('rotor/rotor_steel') }],
  ['rotor/iridium', 1, ['IDI', 'DRD', 'IDI'], { I: IPL, D: U('itemplates/iridium_plate'), R: U('rotor/rotor_carbon') }],
  // T88: продвинутый ветряк (роторы ур. 5–8: углерод, иридий, наши хризолит/аметрин; пик 490–3900 FE/т) — гейт хризолит (S3),
  // улучшенный (ур. 9–11: квантовый/пустотный/сингулярный; 7800+ FE/т) — гейт плутоний (S4) + заряж. аметрин
  ['basemachine3/adv_wind_generator', 1, ['PAP', 'CGC', 'PAP'], { P: '#c:plates/steel', A: ACIR, C: 'kubejs:chrysolite_crystal', G: U('basemachine3/simple_wind_generator') }],
  ['basemachine3/imp_wind_generator', 1, ['IEI', 'AGA', 'IEI'], { I: IPL, E: 'kubejs:energized_ametrine_crystal', A: 'mekanism:pellet_plutonium', G: U('basemachine3/adv_wind_generator') }],
  // солнечные панели (IC2 + ASP)
  ['basemachine3/solar_iu', 1, ['CgC', 'gCg', 'cGc'], { C: '#c:dusts/coal', g: 'minecraft:glass', c: CIR, G: GEN }],
  ['machines/advanced_solar_paneliu', 1, ['RRR', 'ASA', 'CMC'], { R: RGLASS, A: ALLOY, S: U('basemachine3/solar_iu'), C: ACIR, M: ACASE }],
  ['machines/hybrid_solar_paneliu', 1, ['CLC', 'ISI', 'AEA'], { C: CPL, L: 'minecraft:lapis_block', I: IPL, S: U('machines/advanced_solar_paneliu'), A: ACIR, E: ESUN }],
  ['machines/ultimate_solar_paneliu', 1, ['IEI', 'HAH', 'IEI'], { I: IPL, E: ESUN, H: U('machines/hybrid_solar_paneliu'), A: ACIR }], // ≈
  ['machines/quantum_solar_paneliu', 1, ['UAU', 'QIQ', 'UAU'], { U: U('machines/ultimate_solar_paneliu'), A: ACIR, Q: U('itemcore/quacore'), I: IPL }], // ≈
  // TODO crossmod: соларит, обогащённый соларит и квантовое ядро — временные простые рецепты
  ['itemsunnarium/sunnarium_enriched', 1, ['SLS'], { S: SUN, L: LAP }],
  ['itemcore/quacore', 1, ['ALA', 'LEL', 'ALA'], { A: ACASE, L: LAP, E: ESUN }],
  // кабели и трансформаторы
  ['wiring/copper', 6, ['CCC'], { C: ICU }],
  ['wiring/tin', 9, ['CCC'], { C: '#c:ingots/tin' }],
  ['wiring/gold', 12, ['CCC'], { C: '#c:ingots/gold' }],
  ['wiring/iron', 12, ['CCC'], { C: IFE }],
  ['wiring/copper1', 1, ['x'], [U('wiring/copper'), RUBBER]],
  ['wiring/tin1', 1, ['x'], [U('wiring/tin'), RUBBER]],
  ['wiring/gold1', 1, ['x'], [U('wiring/gold'), RUBBER, RUBBER]],
  ['wiring/iron1', 1, ['x'], [U('wiring/iron'), RUBBER, RUBBER]],
  ['wiring/glass_1', 4, ['GGG', 'ESE', 'GGG'], { G: 'minecraft:glass', E: U('itemdust/energium_dust'), S: '#c:dusts/silver' }],
  ['transformer_iu/lv', 1, ['PCP', 'III', 'PCP'], { P: PLANK, C: TIN1, I: ICU }],
  ['transformer_iu/mv', 1, ['C', 'M', 'C'], { C: CU1, M: CASE }],
  ['transformer_iu/hv', 1, [' c ', 'CTE', ' c '], { c: AU1, C: CIR, T: U('transformer_iu/mv'), E: EC }],
  ['transformer_iu/ev', 1, [' c ', 'CTE', ' c '], { c: FE1, C: ACIR, T: U('transformer_iu/hv'), E: LAP }],
  // хранилища и батареи
  ['wiring_storage/batbox_iu', 1, ['PCP', 'BBB', 'PPP'], { P: PLANK, C: TIN1, B: RE }],
  ['wiring_storage/cesu_iu', 1, ['PCP', 'BBB', 'PPP'], { P: '#c:plates/bronze', C: CU1, B: ARE }],
  ['wiring_storage/mfe_iu', 1, ['cEc', 'EME', 'cEc'], { c: AU1, E: EC, M: CASE }],
  ['wiring_storage/mfsu_iu', 1, ['LCL', 'LML', 'LAL'], { L: LAP, C: ACIR, M: U('wiring_storage/mfe_iu'), A: ACASE }],
  ['battery/re_battery', 1, [' C ', 'TRT', 'TRT'], { C: TIN1, T: U('casing/tin'), R: RED }],
  ['battery/advanced_re_battery', 1, [' C ', 'BSB', 'BLB'], { C: CU1, B: U('casing/bronze'), S: RED, L: '#c:dusts/lead' }], // ≈
  ['battery/lapotron_crystal', 1, ['LCL', 'LEL', 'LCL'], { L: '#c:dusts/lapis', C: ACIR, E: EC }],
  ['itemdust/energium_dust', 9, ['RDR', 'DRD', 'RDR'], { R: RED, D: '#c:dusts/diamond' }],
  // инструменты
  ['energy_tools/drill', 1, [' P ', 'PCP', 'PBP'], { P: PFE, C: CIR, B: RE }],
  ['energy_tools/diamond_drill', 1, [' D ', 'DdD'], { D: 'minecraft:diamond', d: U('energy_tools/drill') }],
  ['energy_tools/chainsaw', 1, [' PP', 'PCP', 'BP '], { P: PFE, C: CIR, B: RE }],
  ['energy_tools/nano_saber', 1, ['GA ', 'GA ', 'CEC'], { G: GLOW, A: ALLOY, C: CPL, E: EC }], // ≈
  ['forge_hammer', 1, ['II ', 'ISS', 'II '], { I: IFE, S: 'minecraft:stick' }],
  ['cutter', 1, ['P P', ' P ', 'I I'], { P: PFE, I: IFE }],
  ['energy/wrench', 1, ['B B', 'BBB', ' B '], { B: '#c:ingots/bronze' }],
  ['tools/treetap', 1, [' P ', 'PPP', 'P  '], { P: PLANK }],
  // броня и ранцы
  ['armour/nightvision_goggles', 1, ['ADA', 'GBG', 'R R'], { A: PFE, D: ACIR, G: RGLASS, B: RE, R: RUBBER }], // ≈
  ['armour/nano_helmet', 1, ['CEC', 'CNC'], { C: CPL, E: EC, N: U('armour/nightvision_goggles') }],
  ['armour/nano_chestplate', 1, ['C C', 'CEC', 'CCC'], { C: CPL, E: EC }],
  ['armour/nano_leggings', 1, ['CEC', 'C C', 'C C'], { C: CPL, E: EC }],
  ['armour/nano_boots', 1, ['C C', 'CEC'], { C: CPL, E: EC }],
  ['armour/quantum_helmet', 1, ['ILI', 'INI', 'CGC'], { I: IPL, L: LAP, N: U('armour/nano_helmet'), C: ACIR, G: RGLASS }], // ≈
  ['armour/quantum_chestplate', 1, ['INI', 'ILI', 'CJC'], { I: IPL, N: U('armour/nano_chestplate'), L: LAP, J: U('armour/jetpack'), C: ACIR }], // ≈
  ['armour/quantum_leggings', 1, ['ILI', 'INI', 'C C'], { I: IPL, L: LAP, N: U('armour/nano_leggings'), C: ACIR }], // ≈
  ['armour/quantum_boots', 1, ['INI', 'CLC'], { I: IPL, N: U('armour/nano_boots'), C: ACIR, L: LAP }], // ≈
  ['armour/batpack', 1, ['BCB', 'BPB', 'B B'], { B: RE, C: CIR, P: '#c:plates/tin' }], // ≈
  ['armour/advanced_batpack', 1, ['BCB', 'BPB', 'B B'], { B: ARE, C: ACIR, P: '#c:plates/bronze' }], // ≈
  ['armour/lappack', 1, ['LCL', 'LBL', 'L L'], { L: LAP, C: ACIR, B: U('armour/batpack') }], // ≈
  ['armour/jetpack', 1, ['ICI', 'IBI', 'G G'], { I: U('casing/iron'), C: ACIR, B: U('wiring_storage/batbox_iu'), G: GLOW }],
  // улучшения машин
  ['upgrades/overclocker', 1, ['III', 'WCW'], { I: 'minecraft:ice', W: CU1, C: CIR }], // капсула 10k → лёд
  ['upgrades/transformer', 1, ['GGG', 'WTW', 'GCG'], { G: 'minecraft:glass', W: AU1, T: U('transformer_iu/mv'), C: CIR }],
  ['upgrades/energy_storage', 1, ['PPP', 'WBW', 'PCP'], { P: PLANK, W: CU1, B: RE, C: CIR }],
  // Q15-1: инструменты и заряжающие батареи IU (решение пользователя). LL: IC2 iridium drill / GraviSuite advDDrill, vajra /
  // hielements quantum (9x9 с предметами чужих модов) — переведены на тиры паутины: нано-дрель — хризолит (S3), квантовые — квантовый сплав (S4),
  // ultddrill и ваджра — ядро виверны (S5, перед эндгеймом), чтобы не быть дешевле Meka-Tool/Draconic своего уровня.
  ['energy_tools/nanodrill', 1, ['ACA', 'PDP', 'ABA'], { A: 'mekanism:alloy_reinforced', C: 'kubejs:energized_chrysolite_crystal', P: CPL, D: U('energy_tools/diamond_drill'), B: EC }],
  ['energy_tools/quantumpickaxe', 1, ['QIQ', 'LTL', 'QCQ'], { Q: 'kubejs:quantum_alloy_ingot', I: IPL, L: LAP, T: 'minecraft:diamond_pickaxe', C: 'kubejs:circuit_board_t3' }],
  ['energy_tools/quantumaxe', 1, ['QIQ', 'LTL', 'QCQ'], { Q: 'kubejs:quantum_alloy_ingot', I: IPL, L: LAP, T: 'minecraft:diamond_axe', C: 'kubejs:circuit_board_t3' }],
  ['energy_tools/quantumshovel', 1, ['QIQ', 'LTL', 'QCQ'], { Q: 'kubejs:quantum_alloy_ingot', I: IPL, L: LAP, T: 'minecraft:diamond_shovel', C: 'kubejs:circuit_board_t3' }],
  ['energy_tools/ultddrill', 1, ['OWO', 'XDX', 'CLC'], { O: U('upgrades/overclocker'), W: 'draconicevolution:wyvern_core', X: 'minecraft:diamond_block', D: U('energy_tools/nanodrill'), C: 'kubejs:circuit_board_t3', L: LAP }],
  ['energy_tools/vajra', 1, ['PEP', 'QWQ', 'PLP'], { P: CPL, E: 'kubejs:energized_ametrine_crystal', Q: 'kubejs:quantum_alloy_ingot', W: 'draconicevolution:wyvern_core', L: LAP }],
  ['battery/charging_re_battery', 1, ['CBC', 'B B', 'CBC'], { C: CIR, B: RE }], // LL = IC2
  ['battery/advanced_charging_re_battery', 1, ['EBE', 'BOB', 'EBE'], { E: '#c:plates/bronze', B: ARE, O: U('battery/charging_re_battery') }], // теплообменник IC2 → бронза (реакторов IU нет)
  ['battery/charging_energy_crystal', 1, ['ECE', 'COC', 'ECE'], { E: '#c:plates/gold', C: EC, O: U('battery/advanced_charging_re_battery') }],
  ['battery/charging_lapotron_crystal', 1, ['CLC', 'LOL', 'CLC'], { C: 'minecraft:diamond', L: LAP, O: U('battery/charging_energy_crystal') }],
  // T77 аудит: выталкиватель/затягиватель — улучшения автоматизации IC2, в LoliLand входят в рецепты машин (IC2:upgradeModule:3..6); были скрыты без замены
  ['upgrades/ejector', 1, ['THT', ' C '], { T: '#c:plates/tin', H: 'minecraft:hopper', C: CIR }],
  ['upgrades/pulling', 1, ['TST', ' C '], { T: '#c:plates/tin', S: 'minecraft:sticky_piston', C: CIR }],
  ['upgrades/fluid_ejector', 1, ['THT', 'BCB'], { T: '#c:plates/tin', H: 'minecraft:hopper', B: 'minecraft:bucket', C: CIR }],
  ['upgrades/fluid_pulling', 1, ['TST', 'BCB'], { T: '#c:plates/tin', S: 'minecraft:sticky_piston', B: 'minecraft:bucket', C: CIR }],
  // компоненты
  ['blockresource/machine', 1, ['PPP', 'P P', 'PPP'], { P: PFE }],
  ['blockresource/advanced_machine', 1, [' C ', 'AMA', ' C '], { C: CPL, A: ALLOY, M: CASE }],
  ['crafting_elements/crafting_272_element', 1, ['CCC', 'RIR', 'CCC'], { C: CU1, R: RED, I: PFE }],
  ['crafting_elements/crafting_273_element', 1, ['RGR', 'LCL', 'RGR'], { R: RED, G: GLOW, L: 'minecraft:lapis_lazuli', C: CIR }],
  ['itemingots/alloy_ingot', 2, ['III', 'BBB', 'TTT'], { I: PFE, B: '#c:plates/bronze', T: '#c:plates/tin' }],
  ['crafting_elements/crafting_280_element', 1, ['CC', 'CC'], { C: '#c:dusts/coal' }],
  ['crafting_elements/crafting_281_element', 1, ['x'], [U('crafting_elements/crafting_280_element'), U('crafting_elements/crafting_280_element')]],
  ['crafting_elements/crafting_285_element', 1, ['IAI', 'ADA', 'IAI'], { I: IRID, A: ALLOY, D: 'minecraft:diamond' }],
  ['crafting_elements/crafting_294_element', 1, ['CCC', 'CIC', 'CCC'], { C: U('wiring/copper'), I: IFE }],
  ['crafting_elements/crafting_276_element', 1, [' T ', 'CIC', ' T '], { T: U('casing/tin'), C: COIL, I: IFE }],
  ['crafting_elements/crafting_290_element', 1, ['x'], [U('raw_latex')]], // смола без сушилки латекса
  ['glass/reinforced', 7, ['GAG', 'GGG', 'GAG'], { G: 'minecraft:glass', A: ALLOY }],
  // 5г: входы day11/ll_* без собираемого рецепта (шлем/антиблок/пластина/генератор материи скрыты)
  ['upgrademodules/upgrademodule', 1, [' A ', 'RMR', ' P '], { A: ACIR, R: RED, M: CASE, P: PFE }], // вход maelstromtech:*_x6; вместо антиблока из spectral_solar_helmet
  ['itemdoubleplates/obsidian_doubleplate', 1, ['O', 'P', 'O'], { O: 'minecraft:obsidian', P: PFE }], // вход ll_cores/basis_thermodynamic_core
  ['solidmatter/matter', 1, ['GRG', 'RER', 'GRG'], { G: GLOW, R: RED, E: EC }] // катализатор ll_matter/matter_loose_pink
]

// машины IU: [машина, вход (item или #tag), кол-во, выход, кол-во, удалить сначала рецепт с этим выходом]
var IC2_MACHINE = [
  ['macerator', 'minecraft:coal', 1, U('itemdust/coal_dust'), 1, 'mekanism:dust_coal'],
  // лазурит не трогаем: удаление по выходу mekanism:dust_lapis_lazuli снимает не тот рецепт (проверено 10.11), пыль IU — дробитель Mekanism (fixes_reach)
  ['macerator', U('baseore/iridium'), 1, IRID, 2]
]
// машинные рецепты IU для предметов ic2_keep с входами IU вне набора — удалить все: [машина, выход]
var IC2_MACHINE_DEL = [
  ['sunnurium', SUN], ['enrichment', ESUN], ['molecular', U('itemcore/quacore')],
  ['rotor_assembler', U('rotor/rotor_wood')], ['rotor_assembler', U('rotor/rotor_iron')], ['rotor_assembler', U('rotor/rotor_bronze')],
  ['rotor_assembler', U('rotor/rotor_steel')], ['rotor_assembler', U('rotor/rotor_carbon')], ['rotor_assembler', U('rotor/iridium')], ['handlerho', U('baseore/iridium')], ['farmer', U('raw_latex')],
  ['antiupgradeblock', U('upgrademodules/upgrademodule')] // 5г: модуль теперь верстаком
]

ServerEvents.recipes(function (event) {
  var CRAFT = ['minecraft:crafting_shaped', 'minecraft:crafting_shapeless', 'industrialupgrade:shaped_recipe', 'industrialupgrade:shapeless_recipe']
  var n = 0, ids = {}
  IC2_SHAPED.forEach(function (r) { ids[U(r[0])] = 1 })
  // остальные id ic2_keep без верстака: пластины, оболочки, плотные пластины, композит, углепластик и пр. — только машины IU, как в IC2
  ;['copper', 'tin', 'iron', 'bronze', 'lead', 'gold'].forEach(function (m) {
    ids[U('itemplates/' + m + '_plate')] = ids[U('itemdoubleplates/' + m + '_doubleplate')] = ids[U('casing/' + m)] = 1
  })
  ;['crafting_elements/crafting_274_element', 'crafting_elements/crafting_282_element', 'crafting_elements/crafting_291_element',
    'crafting_elements/crafting_271_element', 'battery/energy_crystal', 'itemdust/coal_dust', 'itemdust/lapis_dust', 'raw_latex',
    'sapling/rubber_sapling', 'baseore/iridium',
    'itemsunnarium/sunnarium2' // T83: санариум как в LoliLand — только молекулярный преобразователь (molecular_transformer.js)
  ].forEach(function (s) { ids[U(s)] = 1 })
  // фильтр {output} у типов IU цепляет и входы (снёс бы ~100 чужих рецептов с корпусом) — сверяем id результата в JSON
  var rm = []
  CRAFT.forEach(function (ty) {
    event.forEachRecipe({ type: ty }, function (r) {
      var res = r.json.get('result'), o = res && res.isJsonObject() ? (res.get('id') || res.get('item')) : null
      if (o && ids[String(o.getAsString())]) rm.push(String(r.getId()))
    })
  })
  rm.forEach(function (id) { event.remove({ id: id }) })
  ;['industrialupgrade:furnace_145', 'industrialupgrade:blasting_146', 'enderio:smelting/industrialupgrade/furnace_145'].forEach(function (id) { event.remove({ id: id }) }) // руда иридия → слиток IU
  IC2_SHAPED.forEach(function (r) {
    var out = Item.of(U(r[0]), r[1]), id = 'kubejs:ic2/' + r[0].replace(/\//g, '_')
    if (Array.isArray(r[3])) event.shapeless(out, r[3]).id(id)
    else event.shaped(out, r[2], r[3]).id(id)
    n++
  })
  event.smelting(IRID, U('baseore/iridium')).xp(1).id('kubejs:ic2/smelt_iridium_ore')
  // ручной старт IC2: молот/кусачки — тип IU shapeless_recipe, инструмент возвращается с износом (ItemToolCrafting.getCraftingRemainingItem)
  var hand = function (tool, inp, out, cnt, id) {
    event.custom({ type: 'industrialupgrade:shapeless_recipe', category: 'misc', ingredients: [inp.charAt(0) == '#' ? { tag: inp.substring(1) } : { item: inp }, { item: U(tool) }],
      result: { count: cnt, id: out }, show_notification: false }).id('kubejs:ic2/hand_' + id); n++
  }
  ;['copper', 'tin', 'iron', 'bronze', 'lead', 'gold'].forEach(function (m) {
    hand('forge_hammer', '#c:ingots/' + m, U('itemplates/' + m + '_plate'), 1, 'plate_' + m)
    hand('forge_hammer', '#c:plates/' + m, U('casing/' + m), 2, 'casing_' + m)
  })
  ;[['copper', 2], ['tin', 3], ['gold', 4], ['iron', 4]].forEach(function (c) { hand('cutter', '#c:plates/' + c[0], U('wiring/' + c[0]), c[1], 'cable_' + c[0]) })
  hand('forge_hammer', 'minecraft:coal', U('itemdust/coal_dust'), 1, 'coal_dust') // угольная пыль для solar_iu до мацератора
  IC2_MACHINE.forEach(function (m, i) {
    if (m[5]) event.custom({ type: 'industrialupgrade:universal_recipe_delete', recipe_type: m[0], isFluidRecipe: false,
      output: [{ type: 'item', id: m[5], amount: 1 }], isRemoveAll: false }).id('kubejs:ic2/del_' + m[0] + '_' + i)
    var tag = m[1].charAt(0) == '#'
    event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: m[0], isFluidRecipe: false,
      inputs: [{ type: tag ? 'tag' : 'item', id: tag ? m[1].substring(1) : m[1], amount: m[2] }],
      outputs: [{ type: 'item', id: m[3], amount: m[4] }], params: {} }).id('kubejs:ic2/' + m[0] + '_' + i)
    n++
  })
  IC2_MACHINE_DEL.forEach(function (m, i) {
    event.custom({ type: 'industrialupgrade:universal_recipe_delete', recipe_type: m[0], isFluidRecipe: false,
      output: [{ type: 'item', id: m[1], amount: 1 }], isRemoveAll: true }).id('kubejs:ic2/del_all_' + i)
  })
  console.info('[ic2] ' + n + ' recipes, removed crafting ' + rm.length)
})

// Сборщик микросхем ('microchip'): выход схем несёт компонент level_microchip, universal_recipe_delete его не видит — удаляем через API IU
ServerEvents.loaded(function () {
  var R = Java.loadClass('com.denfop.api.Recipes').recipes, del = 0
  if (R.getMap_recipe_managers().indexOf('microchip') < 0) { console.error('[check] ic2 microchip: no manager'); return }
  var outs = []
  R.getRecipeList('microchip').forEach(function (r) { var id = String(r.output.items.get(0).id); if (id == CIR || id == ACIR) outs.push(r.output) })
  outs.forEach(function (o) { R['removeRecipe(java.lang.String,com.denfop.api.recipe.RecipeOutput)']('microchip', o); del++ }) // явная перегрузка: иначе Rhino путает с (String, ItemStack)
  var left = 0
  R.getRecipeList('microchip').forEach(function (r) { var id = String(r.output.items.get(0).id); if (id == CIR || id == ACIR) left++ })
  console.info('[check] ic2 microchip 272/273: removed ' + del + ', left ' + left)
})
