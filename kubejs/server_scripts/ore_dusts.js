// T106 п.4, п.8: «как в IC2» — руда в любой дробилке даёт 2 пыли, пыль плавится в любой печи.
// Руда (c:ores/X) → 2 пыли: мацератор IU, дробилка и обогатитель Mekanism, пульверизатор Oritech, SAG-мельница Ender IO
// (дробилка IE и так даёт 2, её побочки — iu_byproducts.js; молот IE — 1, он ручной).
// T107 п.1 (решение пользователя): сырая руда → ровно 2 пыли во всех дробилках, без шансов. Лестница ×3/×4/×5 Mekanism не тронута.
// Пыль → слиток в печи и плавильной печи по тегам; электропечи IU, Mekanism, Oritech, Ender IO берут рецепты обычной печи.
var OD_METALS = ['iron', 'copper', 'gold', 'tin', 'lead', 'osmium', 'uranium', 'silver', 'nickel', 'zinc', 'aluminum', 'cobalt',
  'platinum', 'tungsten', 'titanium']
// пыль → слиток: металлы с пылью в паке (руды нет у сплавов — их пыль тоже плавится)
var OD_SMELT = OD_METALS.concat(['bronze', 'steel', 'electrum', 'constantan', 'invar', 'chromium', 'vanadium', 'magnesium',
  'manganese', 'germanium', 'mikhail', 'spinel', 'iridium', 'refined_obsidian', 'brass'])

// предмет тега по приоритету модов Almost Unified (config/almostunified/unification/materials.json) — единый вариант
var OD_PRIO = ['minecraft', 'kubejs', 'mekanism', 'industrialupgrade', 'immersiveengineering', 'enderio', 'oritech']
function odTarget(tag) {
  var ids = []
  try { Ingredient.of('#' + tag).itemIds.forEach(function (i) { i = String(i); if (i != 'minecraft:barrier' && i != 'minecraft:air') ids.push(i) }) } catch (e) { return null }
  if (!ids.length) return null
  var rank = function (i) { var k = OD_PRIO.indexOf(i.split(':')[0]); return k < 0 ? 99 : k }
  ids.sort(function (a, b) { return rank(a) - rank(b) })
  return ids[0]
}

ServerEvents.recipes(function (event) {
  var first = odTarget
  var has = function (tag) { return first(tag) != null }
  // старые рецепты руды/сырья этих машин — по входному тегу
  var del = []
  ;['mekanism:enriching', 'mekanism:crushing', 'oritech:pulverizer', 'enderio:sag_milling'].forEach(function (ty) {
    event.forEachRecipe({ type: ty }, function (r) {
      var s = String(r.json)
      OD_METALS.forEach(function (m) {
        if (s.indexOf('"c:ores/' + m + '"') >= 0 || s.indexOf('"c:raw_materials/' + m + '"') >= 0) del.push(String(r.getId()))
      })
    })
  })
  del.forEach(function (id) { event.remove({ id: id }) })
  var n = 0, sm = 0
  OD_METALS.forEach(function (m) {
    var dust = first('c:dusts/' + m)
    if (!dust) return
    var ore = 'c:ores/' + m, raw = 'c:raw_materials/' + m, id = function (k) { return 'kubejs:ore_dusts/' + k + '_' + m }
    if (has(ore)) {
      event.custom({ type: 'mekanism:enriching', input: { count: 1, tag: ore }, output: { count: 2, id: dust } }).id(id('enrich_ore'))
      event.custom({ type: 'mekanism:crushing', input: { count: 1, tag: ore }, output: { count: 2, id: dust } }).id(id('crush_ore'))
      event.custom({ type: 'oritech:pulverizer', ingredients: [{ tag: ore }], results: [{ count: 2, id: dust }], time: 100 }).id(id('pulv_ore'))
      event.custom({ type: 'enderio:sag_milling', energy: 2400, input: { tag: ore },
        outputs: [{ item: { count: 2, id: dust } }, { chance: 0.15, item: { count: 1, id: 'minecraft:cobblestone' } }] }).id(id('sag_ore'))
      event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: 'macerator', isFluidRecipe: false,
        inputs: [{ type: 'tag', id: ore, amount: 1 }], outputs: [{ type: 'item', id: dust, amount: 2 }], params: {} }).id(id('iu_ore'))
      n += 5
    }
    if (has(raw)) {
      event.custom({ type: 'mekanism:enriching', input: { count: 1, tag: raw }, output: { count: 2, id: dust } }).id(id('enrich_raw'))
      event.custom({ type: 'mekanism:crushing', input: { count: 1, tag: raw }, output: { count: 2, id: dust } }).id(id('crush_raw'))
      event.custom({ type: 'oritech:pulverizer', ingredients: [{ tag: raw }], results: [{ count: 2, id: dust }], time: 100 }).id(id('pulv_raw'))
      event.custom({ type: 'enderio:sag_milling', energy: 2400, input: { tag: raw },
        outputs: [{ item: { count: 2, id: dust } }] }).id(id('sag_raw'))
      event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: 'macerator', isFluidRecipe: false,
        inputs: [{ type: 'tag', id: raw, amount: 1 }], outputs: [{ type: 'item', id: dust, amount: 2 }], params: {} }).id(id('iu_raw'))
      n += 5
    }
  })
  OD_SMELT.forEach(function (m) {
    var ingot = first('c:ingots/' + m)
    if (!ingot || !has('c:dusts/' + m)) return
    event.smelting(ingot, '#c:dusts/' + m).xp(0.3).id('kubejs:ore_dusts/smelt_' + m)
    event.blasting(ingot, '#c:dusts/' + m).xp(0.3).id('kubejs:ore_dusts/blast_' + m)
    sm++
  })
  // T106 п.6: селитра без Шёлкового касания — 2 редстоуна → 1 пыль селитры (Mekanism, IU; IE — блок редстоуна → 4)
  // (ещё есть песчаник в дробилке IE: песок + селитра; редстоуновая руда — побочка 50%, iu_byproducts.js)
  var SP = odTarget('c:dusts/saltpeter') || 'immersiveengineering:dust_saltpeter'
  event.custom({ type: 'immersiveengineering:crusher', energy: 1600, input: { item: 'minecraft:redstone_block' }, // у IE вход без количества
    result: { id: SP, count: 4 }, secondaries: [] }).id('kubejs:ore_dusts/saltpeter_ie')
  event.custom({ type: 'mekanism:crushing', input: { count: 2, item: 'minecraft:redstone' }, output: { count: 1, id: SP } }).id('kubejs:ore_dusts/saltpeter_mek')
  event.custom({ type: 'industrialupgrade:universal_recipe', recipe_type: 'macerator', isFluidRecipe: false,
    inputs: [{ type: 'item', id: 'minecraft:redstone', amount: 2 }], outputs: [{ type: 'item', id: SP, amount: 1 }], params: {} }).id('kubejs:ore_dusts/saltpeter_iu')
  console.info('[check] ore_dusts: removed ' + del.length + ', crushing ' + n + ', dust smelting ' + sm + ' metals')
})
