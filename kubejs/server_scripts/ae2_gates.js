// P4: ступени AE2 и аддонов (_ai/PROGRESSION.md). Способ как в power_gates.js: новых рецептов нет, в рецепте ОДИН
// ингредиент (который в нём один) меняется на гейт ступени. Гейты те же: S3 хризолит · S4 плутоний · S5 ядро wyvern.
// S3: только контроллер и inscriber — без них не собрать сеть и процессоры, остальная AE2/ExtendedAE/App. Mekanistics
// запирается через них. Ячейки 1k–256k не трогаем.
// MEGA: гейт в компоненте (из него ячейки предметов/жидкостей/химикатов) и в mega_crafting_unit (из него все MEGA
// крафт-хранилища, сопроцессор, монитор; хранилища 64M/256M ещё и через компонент S5).
var AE_G3 = 'kubejs:chrysolite_crystal', AE_G4 = 'mekanism:pellet_plutonium', AE_G5 = 'draconicevolution:wyvern_core'
var VG = 'ae2:quartz_vibrant_glass' // в компонентах MEGA он один (центр); процессор накопления остаётся

// [выход, заменяемый ингредиент, гейт]
var AE_GATES = [
  ['ae2:controller', 'ae2:engineering_processor', AE_G3], // центральный
  ['ae2:inscriber', 'minecraft:piston', AE_G3],
  ['megacells:cell_component_1m', VG, AE_G4], ['megacells:cell_component_4m', VG, AE_G4], ['megacells:cell_component_16m', VG, AE_G4],
  ['megacells:cell_component_64m', VG, AE_G5], ['megacells:cell_component_256m', VG, AE_G5],
  ['megacells:bulk_cell_component', VG, AE_G5],
  ['megacells:mega_crafting_unit', 'megacells:accumulation_processor', AE_G4], // в нём единственный d
  ['advanced_ae:reaction_chamber', 'minecraft:bucket', AE_G4],
  ['advanced_ae:quantum_core', 'advanced_ae:quantum_unit', AE_G5] // ядро одно на квантовый компьютер
]
// ExtendedAE: кристальный сборщик — replaceInput не видит, правим ячейку input_items. [id, индекс, гейт]
var AE_LIST = [
  ['extendedae:assembler/ex_molecular_assembler', 4, AE_G4], // вместо карты скорости
  ['extendedae:assembler/ex_drive', 2, AE_G4] // вместо карты ёмкости
]

ServerEvents.recipes(function (event) {
  AE_GATES.forEach(function (g) { event.replaceInput({ output: g[0] }, g[1], g[2]) })
  var n = 0
  AE_LIST.forEach(function (c) { event.forEachRecipe({ id: c[0] }, function (r) {
    r.json.getAsJsonArray('input_items').set(c[1], JsonIO.parseRaw(JSON.stringify({ ingredient: { item: c[2] } }))); r.save(); n++ }) })
  console.info('[ae2_gates] ' + AE_GATES.length + ' replaceInput, ' + n + '/' + AE_LIST.length + ' json cells')
})
