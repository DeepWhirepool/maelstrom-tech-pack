// P3а: генераторы Powah и Mekanism заперты по ступеням (_ai/POWER.md). Зачем: на S0–S1 были доступны генераторы
// до 8000 FE/t (утечка энергии). Новых рецептов нет: в рецепте генератора ОДИН ингредиент меняется на гейт ступени.
// Гейты: S1 улучш. электросхема IU · S2 infused alloy · S3 хризолит · S4 плутоний · S5 ядро wyvern.
// Powah: меняется диэлектрический корпус (он в рецепте один); у реакторов basic+ — центральный уранинит.
// Кристаллы F/C/EA из web_3_energy.js стоят в других ячейках и остаются.
var G1 = 'industrialupgrade:crafting_elements/crafting_273_element', G2 = 'mekanism:alloy_infused'
var G3 = 'kubejs:chrysolite_crystal', G4 = 'mekanism:pellet_plutonium', G5 = 'draconicevolution:wyvern_core'
var PC = 'powah:dielectric_casing', PU = 'powah:uraninite'

// [выход, заменяемый ингредиент, гейт]
var POWER_GATES = [
  ['powah:furnator_basic', PC, G1], ['powah:magmator_basic', PC, G1],
  ['powah:furnator_hardened', PC, G3], ['powah:magmator_hardened', PC, G3],
  ['powah:solar_panel_starter', PC, G1], ['powah:thermo_generator_starter', PC, G1],
  ['powah:solar_panel_hardened', PC, G3], ['powah:thermo_generator_hardened', PC, G3],
  ['powah:reactor_starter', PC, G3],
  ['powah:reactor_spirited', PU, G5], ['powah:reactor_nitro', PU, G5],
  // Mekanism (solar/heat/wind уже заперты кристаллами web_3)
  ['mekanismgenerators:advanced_solar_generator', 'mekanism:alloy_infused', G3],
  ['mekanismgenerators:bio_generator', 'mekanism:basic_control_circuit', G3],
  // деление S4: плутоний даёт само деление (круг), поэтому EA + иридиевая пластина IC2 (crafting_285); порт и адаптер — из корпуса
  ['mekanismgenerators:fission_reactor_casing', 'mekanism:steel_casing', 'kubejs:energized_ametrine_crystal'],
  ['mekanismgenerators:fission_reactor_port', 'mekanism:elite_control_circuit', 'industrialupgrade:crafting_elements/crafting_285_element'],
  ['mekanismgenerators:fission_fuel_assembly', 'mekanism:basic_chemical_tank', 'industrialupgrade:crafting_elements/crafting_285_element']
]
// Эти рецепты уже правит web_3 (кристалл в своей ячейке): replaceInput пересохраняет рецепт и ломает символ web_3,
// поэтому здесь тот же способ, что в web_3 — ячейка [1, столбец] через webSetCell. [id рецепта, гейт, столбец (по умолчанию 1)]
// P3в: турбина и реактор Oritech — 1 ядро на мультиблок (rotational complex и контроллер одни на структуру).
var POWER_CENTER = [
  ['mekanismgenerators:rotational_complex', G5], // вместо центрального infused alloy
  ['oritech:crafting/controller', G5, 0], // вместо одного из двух processing unit
  ['powah:crafting/solar_panel_basic', G2], ['powah:crafting/thermo_generator_basic', G2], // вместо диэл. корпуса
  ['powah:crafting/reactor_basic', G4], // вместо уранинита
  ['mekanismgenerators:generator/gas_burning', G4], // вместо электролитического ядра
  ['mekanismgenerators:reactor/controller', G5] // термояд: вместо хим. бака; контроллер один на реактор
]
// S4 для всех тиров blazing…nitro furnator/magmator, spirited/nitro solar/thermo, basic…niotic реакторов
;['blazing', 'niotic', 'spirited', 'nitro'].forEach(function (t) {
  POWER_GATES.push(['powah:furnator_' + t, PC, G4], ['powah:magmator_' + t, PC, G4])
  var sun = (t == 'spirited' || t == 'nitro') ? G4 : G3
  POWER_GATES.push(['powah:solar_panel_' + t, PC, sun], ['powah:thermo_generator_' + t, PC, sun])
})
;['hardened', 'blazing', 'niotic'].forEach(function (t) { POWER_GATES.push(['powah:reactor_' + t, PU, G4]) })

// P3б: IF, Oritech, IE, DE, EIO. Меняется ингредиент, который в рецепте один (у mycelial — редстоун ×2, рамка тира остаётся).
POWER_GATES.push(
  ['industrialforegoing:biofuel_generator', 'minecraft:furnace', G3],
  ['oritech:big_solar_panel_block', 'oritech:advanced_battery', G2],
  ['oritech:fuel_generator_block', 'oritech:enderic_lens', G3],
  ['oritech:steam_engine_block', 'oritech:magnetic_coil', G3],
  ['immersiveengineering:generator', 'immersiveengineering:component_iron', G4], // блок дизельного генератора
  ['draconicevolution:generator', 'minecraft:furnace', G4],
  ['enderio:pulsating_photovoltaic_module', 'enderio:double_layer_capacitor', G3]
)
;['furnace', 'slimey', 'culinary', 'potion', 'disenchantment', 'ender', 'explosive', 'frosty', 'halitosis', 'magma', 'pink',
  'netherstar', 'death', 'rocket', 'crimed', 'meatallurgic'].forEach(function (t) {
  // P3в: >768 FE/t (javap calculate) — S4: culinary (насыщение×80, до 1152), potion (до 7290), disenchantment (160×Σур/макс),
  // rocket (80×множитель звёзд, растёт степенью), netherstar (4000)
  var s4 = ['culinary', 'potion', 'disenchantment', 'rocket', 'netherstar'].indexOf(t) >= 0
  POWER_GATES.push(['industrialforegoing:mycelial_' + t, 'minecraft:redstone', s4 ? G4 : G3])
})
// Simply Quarries: QE не обязательна (javap: каждый блок ест только EF, 80 QE дают шанс ~15% на двойной дроп).
// Старые рецепты IU из скрытых предметов заменены: simple S4, остальные S5, каждый из предыдущего карьера.
// replaceInput не видит входы камеры растворения IF и ассемблера Oritech: ячейка списка в r.json. [id, поле, индекс, гейт]
var POWER_LIST = [['industrialforegoing:dissolution_chamber/mycelial_reactor', 'input', 6, G5]] // звезда Незера
var SQ = 'simplyquarries:simplyquarries/', SQ_TIERS = ['simply_quarry', 'adv_simply_quarry', 'imp_simply_quarry', 'per_simply_quarry', 'pho_simply_quarry']

ServerEvents.recipes(function (event) {
  POWER_GATES.forEach(function (g) { event.replaceInput({ output: g[0] }, g[1], g[2]) })
  var n = 0
  POWER_CENTER.forEach(function (c) { event.forEachRecipe({ id: c[0] }, function (r) { webSetCell(r, 1, c.length > 2 ? c[2] : 1, c[1]); n++ }) })
  POWER_LIST.forEach(function (c) { event.forEachRecipe({ id: c[0] }, function (r) {
    r.json.getAsJsonArray(c[1]).set(c[2], JsonIO.parseRaw(JSON.stringify({ item: c[3] }))); r.save(); n++ }) })
  SQ_TIERS.forEach(function (t, i) {
    event.remove({ output: SQ + t })
    if (i == 0) event.shaped(SQ + t, [' P ', 'DMD', ' C '], { P: G4, D: 'minecraft:diamond_pickaxe',
      M: 'industrialupgrade:blockresource/advanced_machine', C: 'mekanism:elite_control_circuit' }).id('kubejs:power/' + t)
    else event.shaped(SQ + t, [' W ', 'CQC', ' W '], { W: G5, Q: SQ + SQ_TIERS[i - 1], C: 'mekanism:ultimate_control_circuit' }).id('kubejs:power/' + t)
  })
  // P3г: Power Utilities. Старые рецепты IU (2433–2437) из скрытых предметов отключены в kubejs/data; QE-конвертер и модуль QE
  // скрыты (client_scripts/hide_powerutils.js) — QE в паке нет. Конвертер EF↔FE 1:4 (javap, как у IU) — дюпа по кругу нет.
  // Модули нано (IU) и гибридный (FE) — S3: хризолит вместо nanocircuit/hybcore; конвертер заперт через модули.
  var IU = 'industrialupgrade:', MC = 'mekanism:advanced_control_circuit', TM = IU + 'transformer_iu/mv'
  event.shaped('powerutils:module_ic', ['ABA', 'CDG', 'ABA'], { A: IU + 'wiring/copper', B: TM, C: MC, D: IU + 'wiring_storage/cesu_iu', G: G3 }).id('kubejs:power/module_ic')
  event.shaped('powerutils:module_fe', ['ABA', 'CGC', 'ABA'], { A: 'mekanism:energy_tablet', B: TM, C: MC, G: G3 }).id('kubejs:power/module_fe')
  event.shaped('powerutils:converter/power_utilities_fe', ['ABA', 'CDE', 'ABA'], { A: IU + 'wiring/gold', B: IU + 'transformer_iu/hv',
    C: 'powerutils:module_ic', D: IU + 'blockresource/machine', E: 'powerutils:module_fe' }).id('kubejs:power/converter_fe')
  console.info('[power_gates] ' + POWER_GATES.length + ' replaceInput, ' + n + '/' + (POWER_CENTER.length + POWER_LIST.length) + ' json cells')
})
