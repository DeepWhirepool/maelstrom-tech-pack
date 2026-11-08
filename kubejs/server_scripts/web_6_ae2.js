// T36: web_6 AE2. Хранилище и автокрафт ME требуют деталей IU, Mekanism, Ender IO и плат kubejs (t2/t3 — Ender IO, IU, AE2).
// Ячейка сетки — через webSetCell (web_3_energy.js), в бесформенные рецепты деталь добавляется.
// Контроллер ME — в web_1_casings.js (рецепт уже заменён там, + заряженный флюорит).
// Процессоры не трогаем: печать схем в inscriber идёт в режиме inscribe, где верх/низ не расходуются, —
// пыль в нижнем слоте была бы многоразовым «прессом» (блокер, см. REPORT). Петли с платой t3 (logic_processor) нет.

var WEB6_SLOT = [
  // компоненты ячеек: вместо одного из 4 повторяющихся (кварц / пыль)
  ['ae2:network/cells/item_storage_components_cell_1k_part', 0, 1, 'industrialupgrade:circuit/circuit_part1'],
  ['ae2:network/cells/item_storage_components_cell_4k_part', 0, 0, 'industrialupgrade:circuit/advanced_part1'],
  ['ae2:network/cells/item_storage_components_cell_16k_part', 0, 0, 'kubejs:circuit_board_t2'],
  ['ae2:network/cells/item_storage_components_cell_64k_part', 0, 0, 'kubejs:circuit_board_t2'],
  ['ae2:network/cells/item_storage_components_cell_256k_part', 0, 0, 'kubejs:circuit_board_t3'],
  // блок крафта: вместо одного из 4 железных слитков
  ['ae2:network/crafting/cpu_crafting_unit', 0, 0, 'mekanism:basic_control_circuit']
]
// бесформенные: со-процессор и хранилища крафта 64k/256k + конденсатор Ender IO
var WEB6_ADD = [
  ['ae2:network/crafting/cpu_crafting_accelerator', 'enderio:double_layer_capacitor'],
  ['ae2:network/crafting/64k_cpu_crafting_storage', 'enderio:double_layer_capacitor'],
  ['ae2:network/crafting/256k_cpu_crafting_storage', 'enderio:octadic_capacitor']
]

ServerEvents.recipes(function (event) {
  var done = []
  WEB6_SLOT.forEach(function (s) {
    event.forEachRecipe({ id: s[0] }, function (r) { webSetCell(r, s[1], s[2], s[3]); done.push(s[0]) })
  })
  WEB6_ADD.forEach(function (a) {
    event.forEachRecipe({ id: a[0] }, function (r) {
      r.json.getAsJsonArray('ingredients').add(JsonIO.parseRaw(JSON.stringify({ item: a[1] })))
      r.save()
      done.push(a[0])
    })
  })
  var missing = WEB6_SLOT.concat(WEB6_ADD).map(function (x) { return x[0] }).filter(function (id) { return done.indexOf(id) < 0 })
  console.info('[web_6] ' + done.length + ' recipes' + (missing.length ? ', not found: ' + missing.join(', ') : ''))
})
