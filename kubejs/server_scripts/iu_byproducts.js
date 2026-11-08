// T14: в мире оставлены 6 руд IU (titanium, topaz, sapphire, tungsten, cobalt, mikhail: их больше всего в
// circuit, wiring, корпусах машин, simplemachine и паровых машинах). Генерация остальных 11 выключена
// (kubejs/data/industrialupgrade), блоки руд скрыты из JEI (client_scripts/hide_iu.js).
// Зачем этот файл: убранные металлы нужны рано, поэтому их пыль идёт побочкой дробилки IE из обычных руд,
// а на поздней игре их добывает лазерный бур (laser_ores.js).

var IU_BYPRODUCTS = [
  // [рецепт дробилки IE, предмет IU, шанс]
  ['ore_iron', 'itemdust/vanadium_dust', 0.15], ['raw_ore_iron', 'itemdust/vanadium_dust', 0.15],
  ['ore_iron', 'itemdust/chromium_dust', 0.15], ['raw_ore_iron', 'itemdust/chromium_dust', 0.15],
  ['ore_iron', 'itemdust/manganese_dust', 0.1], ['raw_ore_iron', 'itemdust/manganese_dust', 0.1], // ферромарганец
  ['ore_copper', 'itemdust/germanium_dust', 0.15], ['raw_ore_copper', 'itemdust/germanium_dust', 0.15],
  ['ore_lead', 'itemdust/zinc_dust', 0.2], ['raw_ore_lead', 'itemdust/zinc_dust', 0.2], // свинец и цинк в одних жилах
  ['ore_aluminum', 'itemdust/magnesium_dust', 0.15], ['raw_ore_aluminum', 'itemdust/magnesium_dust', 0.15],
  ['ore_gold', 'itemdust/iridium_dust', 0.05], ['raw_ore_gold', 'itemdust/iridium_dust', 0.05],
  ['ore_coal', 'itemdust/sulfur_dust', 0.2], // заменяет серу по тегу (могла выпасть сера Mekanism)
  ['ore_redstone', 'raw_saltpeter/raw_saltpeter', 0.2], // пыли селитры у IU нет, только сырьё
  ['ore_emerald', 'itemdust/spinel_dust', 0.2], ['ore_diamond', 'itemdust/spinel_dust', 0.2],
  ['bone_meal', 'itemdust/calcium_dust_dust', 0.2] // кость -> костная мука (известняка в сборке нет)
]

// Зачем: у IU пыль этих металлов в печи не плавится (только руда/сырьё), а побочка даёт именно пыль.
var IU_DUST_SMELT = ['chromium', 'germanium', 'iridium', 'magnesium', 'manganese', 'spinel', 'vanadium', 'zinc']

ServerEvents.recipes(function (event) {
  var recipes = {}
  IU_BYPRODUCTS.forEach(function (b) {
    var id = 'immersiveengineering:crusher/' + b[0]
    if (!recipes[id]) event.forEachRecipe({ id: id }, function (r) { recipes[id] = JSON.parse(String(r.json)) })
    var json = recipes[id]
    if (!json) return console.error('[iu_byproducts] no recipe ' + id)
    var item = 'industrialupgrade:' + b[1]
    json.secondaries = (json.secondaries || []).filter(function (s) {
      return !(s.output && s.output.tag == 'c:dusts/sulfur' && item.indexOf('sulfur') >= 0)
    })
    json.secondaries.push({ chance: b[2], output: { id: item } })
  })
  var n = 0
  Object.keys(recipes).forEach(function (id) {
    event.remove({ id: id })
    event.custom(recipes[id]).id(id)
    n++
  })
  IU_DUST_SMELT.forEach(function (m) {
    var dust = 'industrialupgrade:itemdust/' + m + '_dust'
    var ingot = 'industrialupgrade:itemingots/' + m + '_ingot'
    event.smelting(ingot, dust).xp(0.3).id('kubejs:iu_dust_smelting/' + m)
    event.blasting(ingot, dust).xp(0.3).id('kubejs:iu_dust_blasting/' + m)
  })
  console.info('[iu_byproducts] crusher recipes: ' + n + ', dust smelting: ' + IU_DUST_SMELT.length)
})
