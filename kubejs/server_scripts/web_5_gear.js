// T35: web_5 снаряжение. Броня, инструменты и джетпаки растут по тем же тирам кристаллов, что энергетика (web_3):
// тир 1 — флюорит (Mekanism), тир 2 — хризолит (лазерный бур IF) + деталь Mekanism, тир 3 — слияние Draconic + кристалл/сплав.
// Ячейка сетки меняется через webSetCell (web_3_energy.js): пустая ячейка или один из повторяющихся предметов.

var IU = function (n) { return 'industrialupgrade:industrialupgrade_' + n }
var W5F = 'kubejs:fluorite_crystal', W5C = 'kubejs:chrysolite_crystal', W5R = 'mekanism:alloy_reinforced'

// [id рецепта, строка, столбец, предмет]
var WEB5_SLOT = [
  // Тир 1: IU нано-сет (пустая ячейка; у шлема — одна из 4 нано-деталей), нано-сабля, электроинструменты; Mekanism
  // T58: нано-сет 1688–1691, квант-сет 1696–1699 и алмазная дрель 1641 — рецепты LoliLand (ll_ic2.js)
  [IU(1654), 0, 2, W5F], // нано-сабля: пустой угол
  [IU(1640), 0, 1, W5F], [IU(1639), 0, 0, W5F], // дрель, цепная пила: пустая ячейка
  ['mekanism:atomic_disassembler', 2, 0, W5F], ['mekanism:jetpack', 2, 0, W5F],
  // Тир 2: IU квант-сет — хризолит вместо одной из 2 деталей 285, усиленный сплав Mekanism вместо одного из 2 quantumitems6
  // IU нано-/квантовый бур: пустой нижний ряд; второй рецепт квантового бура — вместо 2 из 4 пластин
  [IU(652), 2, 0, W5C], [IU(652), 2, 2, W5R], [IU(653), 2, 0, W5C], [IU(653), 2, 2, W5R],
  [IU(655), 0, 0, W5C], [IU(655), 0, 2, W5R],
  // MekaSuit и Meka-Tool (детали Mekanism уже внутри): хризолит вместо одного из листов HDPE
  ['mekanism:mekasuit_helmet', 1, 0, W5C], ['mekanism:mekasuit_bodyarmor', 1, 0, W5C], ['mekanism:mekasuit_pants', 1, 0, W5C],
  ['mekanism:mekasuit_boots', 1, 0, W5C], ['mekanism:meka_tool', 1, 0, W5C]
]
// Тир 3: слияние Draconic — wyvern + заряженный аметрин, draconic + квантовый сплав (IU-деталь). Мотыги, луки, конденсаторы не трогаем (лимит ~35).
var WEB5_FUSION = []
;['chestpiece', 'sword', 'axe', 'shovel', 'pickaxe'].forEach(function (t) {
  // T59: нагрудник виверны и кирка draconic — рецепты LoliLand (ll_draconic.js)
  if (t != 'chestpiece') WEB5_FUSION.push(['draconicevolution:tools/wyvern_' + t, 'kubejs:energized_ametrine_crystal'])
  if (t != 'pickaxe') WEB5_FUSION.push(['draconicevolution:tools/draconic_' + t, 'kubejs:quantum_alloy_ingot'])
})
// T59: посох draconic — рецепт LoliLand (ll_draconic.js)

ServerEvents.recipes(function (event) {
  var done = []
  WEB5_SLOT.forEach(function (s) {
    event.forEachRecipe({ id: s[0] }, function (r) { webSetCell(r, s[1], s[2], s[3]); done.push(s[0]) })
  })
  WEB5_FUSION.forEach(function (f) {
    event.forEachRecipe({ id: f[0] }, function (r) {
      r.json.getAsJsonArray('ingredients').add(JsonIO.parseRaw(JSON.stringify({ consume: true, ingredient: { item: f[1] } })))
      r.save()
      done.push(f[0])
    })
  })
  var all = WEB5_SLOT.concat(WEB5_FUSION).map(function (x) { return x[0] })
  var missing = all.filter(function (id) { return done.indexOf(id) < 0 })
  var uniq = all.filter(function (id, i) { return all.indexOf(id) == i })
  console.info('[web_5] ' + uniq.length + ' recipes' + (missing.length ? ', not found: ' + missing.join(', ') : ''))
})
