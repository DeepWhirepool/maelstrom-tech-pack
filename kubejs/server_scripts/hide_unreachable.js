// T49: спрятать мёртвые ветки модов основы в JEI (файл генерирует _ai/tools/reach.py --dead --write).
// Зачем: правило «только нужный контент» — предмета нельзя получить и он не вход ни одного доступного рецепта.
// Не тронуто: web_1..7, materials, fixes_reach, квесты, руды, Maelstrom Tech, KubeJS. Рецепты и предметы не удаляются.
// Не влезло в лимит 400: 0.
var HIDE_UNREACHABLE = [
  'industrialupgrade:basemachine3/gas_combiner',
  'industrialupgrade:basemachine3/gas_generator',
  'industrialupgrade:basemachine3/gas_pump',
  'industrialupgrade:basemachine3/recipe_tuner',
  'industrialupgrade:basemachine3/tesseract',
  'industrialupgrade:basemachine3/wireless_gas_pump',
  'industrialupgrade:crafting_elements/crafting_155_element',
  'industrialupgrade:crafting_elements/crafting_240_element',
  'industrialupgrade:crafting_elements/crafting_263_element',
  'industrialupgrade:crafting_elements/crafting_264_element',
  'industrialupgrade:crafting_elements/crafting_287_element',
  'industrialupgrade:crafting_elements/crafting_288_element',
  'industrialupgrade:crafting_elements/crafting_291_element',
  'industrialupgrade:crafting_elements/crafting_296_element',
  'industrialupgrade:crafting_elements/crafting_457_element',
  'industrialupgrade:crafting_elements/crafting_464_element',
  'industrialupgrade:crafting_elements/crafting_465_element',
  'industrialupgrade:crafting_elements/crafting_477_element',
  'industrialupgrade:crafting_elements/crafting_639_element',
  'industrialupgrade:crafting_elements/crafting_640_element',
  'industrialupgrade:crafting_elements/crafting_641_element',
  'industrialupgrade:crafting_elements/crafting_642_element',
  'industrialupgrade:crafting_elements/crafting_645_element',
  'industrialupgrade:crafting_elements/crafting_646_element',
  'industrialupgrade:crafting_elements/crafting_647_element',
  'industrialupgrade:crafting_elements/crafting_649_element',
  'industrialupgrade:crafting_elements/crafting_788_element',
  'industrialupgrade:crafting_elements/crafting_789_element',
  'industrialupgrade:doublescrapbox',
  'industrialupgrade:gas_turbine/gas_turbine_tank',
  'industrialupgrade:plant_mixture',
  'industrialupgrade:polished_stick',
  'industrialupgrade:recipe_schedule',
  'mekanism:hydrogen_bucket',
  'mekanism:module_frost_walker_unit',
  'avaritia:soul_farmland',
  'immersiveengineering:alu_catwalk',
  'immersiveengineering:steel_catwalk',
  'immersiveengineering:treated_door_framed',
  'immersiveengineering:treated_trapdoor_framed',
  'oritech:shrinker_block',
  'oritech:still_naphtha_bucket',
  'oritech:uranium_crystal',
  'industrialforegoing:meat_bucket',
  'industrialforegoing:mycelial_meatallurgic'
]
// Сервер: только проверка, что все id существуют (скрытие — в client_scripts/hide_unreachable.js).
ServerEvents.loaded(function (event) {
  var bad = HIDE_UNREACHABLE.filter(function (id) { return Item.of(id).isEmpty() })
  console.info('[check] hide_unreachable: ' + HIDE_UNREACHABLE.length + ' items' + (bad.length ? ', not found: ' + bad.join(', ') : ''))
})
