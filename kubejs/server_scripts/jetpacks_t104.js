// T104 (решение пользователя): джетпаки в паке — только реактивные ранцы IU. Джетпаки Oritech (jetpack, exo_jetpack) и Mekanism
// (jetpack, jetpack_armored) скрыты: рецепты убраны, в JEI не видны (client_scripts/hide_jetpacks.js), предметы не удалены.
ServerEvents.recipes(function (e) {
  var JET = 'industrialupgrade:armour/jetpack'
  ;['oritech:crafting/basicjetpack', 'oritech:crafting/basicjetpackalt', 'oritech:crafting/exojetpack', 'mekanism:jetpack', 'mekanism:jetpack_armored']
    .forEach(function (id) { e.remove({ id: id }) })
  // элитры Oritech остаются: вместо джетпака Oritech — ранец IU. Старших ранцев IU (улучшенный и выше) в паке получить нельзя,
  // поэтому и у экзо-элитр обычный ранец — их сила от экзо-брони, ионного двигателя и бака (рецепт через элитры)
  e.replaceInput({ id: 'oritech:crafting/boostedelytra' }, 'oritech:jetpack', JET)
  e.replaceInput({ id: 'oritech:crafting/exoboostedelytra' }, 'oritech:exo_jetpack', JET)
  // модуль джетпака MekaSuit не скрыт: вместо джетпака Mekanism — ранец IU
  e.replaceInput({ id: 'mekanism:module_jetpack_unit' }, 'mekanism:jetpack', JET)
  e.replaceInput({ id: 'mekanism:module_jetpack_unit' }, 'mekanism:jetpack_armored', JET)
})
