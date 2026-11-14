// T104 (решение пользователя): джетпаки в паке — только реактивные ранцы IU. Джетпаки Oritech (jetpack, exo_jetpack) и Mekanism
// (jetpack, jetpack_armored) скрыты: рецепты убраны, в JEI не видны (client_scripts/hide_jetpacks.js), предметы не удалены.
ServerEvents.recipes(function (e) {
  var JET = 'industrialupgrade:armour/jetpack'
  ;['oritech:crafting/basicjetpack', 'oritech:crafting/basicjetpackalt', 'oritech:crafting/exojetpack', 'mekanism:jetpack', 'mekanism:jetpack_armored']
    .forEach(function (id) { e.remove({ id: id }) })
  // элитры Oritech остаются: вместо джетпака Oritech — ранец IU
  e.replaceInput({ id: 'oritech:crafting/boostedelytra' }, 'oritech:jetpack', JET)
  // T105: экзо-элитры — усовершенствованный ранец IU (S3); в альтернативном рецепте он вместо верхнего ионного двигателя,
  // иначе через элитры с обычным ранцем лестница обходится
  e.replaceInput({ id: 'oritech:crafting/exoboostedelytra' }, 'oritech:exo_jetpack', 'industrialupgrade:armour/impjetpack')
  e.forEachRecipe({ id: 'oritech:crafting/exoboostedelytraalt' }, function (r) { webSetCell(r, 0, 1, 'industrialupgrade:armour/impjetpack') })
  // T105: лестница ранцев IU (в LoliLand старшие — встроенные GraviSuite, в паке рецептов не было). Одна раскладка:
  // прошлый ранец в центре + сплав Mekanism, схема Mekanism, материал и кристалл своей ступени. Скорость у всех одна (код IU),
  // растут заряд 30k → 60k → 120k → 250k EU (время полёта ×2/×4/×8) и скорость зарядки
  ;[
    ['advjetpack', 'jetpack', 'mekanism:alloy_infused', 'mekanism:advanced_control_circuit', 'enderio:energetic_alloy_ingot', 'kubejs:energized_fluorite_crystal'], // S2
    ['impjetpack', 'advjetpack', 'mekanism:alloy_reinforced', 'mekanism:elite_control_circuit', 'industrialforegoing:plastic', 'kubejs:chrysolite_crystal'], // S3
    ['perjetpack', 'impjetpack', 'mekanism:alloy_atomic', 'mekanism:ultimate_control_circuit', 'mekanism:pellet_plutonium', 'kubejs:energized_ametrine_crystal'] // S4
  ].forEach(function (j) {
    e.shaped('industrialupgrade:armour/' + j[0], ['ACA', 'EJE', 'K K'], {
      J: 'industrialupgrade:armour/' + j[1], A: j[2], C: j[3], E: j[4], K: j[5]
    }).id('kubejs:t105/' + j[0])
  })
  // модуль джетпака MekaSuit не скрыт: вместо джетпака Mekanism — ранец IU
  e.replaceInput({ id: 'mekanism:module_jetpack_unit' }, 'mekanism:jetpack', JET)
  e.replaceInput({ id: 'mekanism:module_jetpack_unit' }, 'mekanism:jetpack_armored', JET)
})
