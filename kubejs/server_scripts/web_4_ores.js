// T30: web_4 переработка руд. ×2 — в одном моде (обогатитель Mekanism не тронут); каждый следующий множитель
// требует детали другого мода: ×3 — IU, ×4 — Ender IO, ×5 — AE2 и IF. Шары SAG-мельницы Ender IO — со сплавом IU/Mekanism,
// линзы и бур IF — с деталью IU. Способ как в web_3: одна ячейка сетки меняется через r.json + r.save().
// Машины переработки IU (T34) — с деталью Mekanism, тем же способом.

var CASING_IU = 'industrialupgrade:blockresource/machine'
// [id рецепта, строка, столбец, деталь]
var WEB4_SLOT = [
  ['mekanism:purification_chamber', 1, 0, 'industrialupgrade:alloyingot/stainless_steel'], // ×3, вместо осмия
  ['mekanism:chemical_injection_chamber', 1, 0, 'enderio:pulsating_crystal'], // ×4, вместо золота
  ['mekanism:chemical_dissolution_chamber', 0, 1, 'ae2:engineering_processor'], // ×5, вместо одного бака
  ['mekanism:chemical_washer', 0, 0, 'industrialforegoing:machine_frame_simple'], // ×5, T34: вместо одного из 4 обсидиановых слитков (бак химии один)
  ['mekanism:chemical_crystallizer', 0, 1, 'ae2:logic_processor'], // ×5, вместо одного флюорита
  // шары: центр креста — сплав IU или Mekanism (24 шара на крафт)
  ['enderio:redstone_alloy_grinding_ball', 1, 1, 'industrialupgrade:alloyingot/red_brass'],
  ['enderio:conductive_alloy_grinding_ball', 1, 1, 'industrialupgrade:alloyingot/nichrome'],
  ['enderio:soularium_grinding_ball', 1, 1, 'industrialupgrade:alloyingot/alumel'],
  ['enderio:dark_steel_grinding_ball', 1, 1, 'industrialupgrade:alloyingot/stainless_steel'],
  ['enderio:pulsating_alloy_grinding_ball', 1, 1, 'industrialupgrade:alloyingot/permalloy'],
  ['enderio:energetic_alloy_grinding_ball', 1, 1, 'mekanism:alloy_infused'],
  ['enderio:vibrant_alloy_grinding_ball', 1, 1, 'mekanism:alloy_reinforced'],
  ['enderio:end_steel_grinding_ball', 1, 1, 'mekanism:alloy_atomic'],
  // бур IF: корпус машин IU вместо железной руды / поршня
  ['industrialforegoing:ore_laser_base', 1, 0, CASING_IU],
  ['industrialforegoing:laser_drill', 1, 0, CASING_IU],
  // T34 IU: машины переработки руд — деталь Mekanism по множителю (×2 сплав, ×3 укреплённый, ×4 атомный, фотонные — ultimate-схема)
  ['industrialupgrade:industrialupgrade_1402', 0, 1, 'mekanism:alloy_infused'], ['industrialupgrade:industrialupgrade_1405', 2, 0, 'mekanism:alloy_infused'],
  ['industrialupgrade:industrialupgrade_1403', 0, 1, 'mekanism:alloy_reinforced'], ['industrialupgrade:industrialupgrade_1406', 2, 0, 'mekanism:alloy_reinforced'],
  ['industrialupgrade:industrialupgrade_1404', 0, 1, 'mekanism:alloy_atomic'], ['industrialupgrade:industrialupgrade_1407', 2, 0, 'mekanism:alloy_atomic'],
  ['industrialupgrade:industrialupgrade_1335', 0, 1, 'mekanism:ultimate_control_circuit'], ['industrialupgrade:industrialupgrade_1338', 2, 0, 'mekanism:ultimate_control_circuit'],
  ['industrialupgrade:industrialupgrade_1174', 0, 0, 'mekanism:elite_control_circuit']
]
// линзы IF (растворитель): + первая часть схемы IU. Перекраска линз требует готовую линзу, обхода нет.
var WEB4_LENS = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan',
  'purple', 'blue', 'brown', 'green', 'red', 'black'].map(function (c) { return 'industrialforegoing:dissolution_chamber/' + c + '_laser_lens' })

ServerEvents.recipes(function (event) {
  var done = []
  WEB4_SLOT.forEach(function (s) {
    event.forEachRecipe({ id: s[0] }, function (r) {
      webSetCell(r, s[1], s[2], s[3]) // функция из web_3_energy.js
      done.push(s[0])
    })
  })
  WEB4_LENS.forEach(function (id) {
    event.forEachRecipe({ id: id }, function (r) {
      r.json.getAsJsonArray('input').add(JsonIO.parseRaw('{"item":"industrialupgrade:circuit/circuit_part1"}'))
      r.save()
      done.push(id)
    })
  })
  var missing = WEB4_SLOT.map(function (x) { return x[0] }).concat(WEB4_LENS).filter(function (id) { return done.indexOf(id) < 0 })
  console.info('[web_4] ' + done.length + ' recipes' + (missing.length ? ', not found: ' + missing.join(', ') : ''))
})
