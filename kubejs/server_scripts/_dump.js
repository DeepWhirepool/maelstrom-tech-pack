// T1: выгрузка ID рецептов и предметов для анализа кросс-мод рецептов (T5+). Рецепты не меняет.
// KubeJS умеет писать из скриптов только JSON, поэтому предметы идут в dump_items.json,
// а dump_items.txt (по строке на id) собирается из него после запуска игры.

var DUMP_MODS = [
  'industrialupgrade', 'mekanism', 'mekanismgenerators', 'enderio', 'industrialforegoing',
  'draconicevolution', 'oritech', 'powah', 'create', 'forestry', 'immersiveengineering',
  'ae2', 'extendedae', 'avaritia'
]

// Поля выхода называются по-разному: result, results, output, main_output, products...
var DUMP_OUTPUT_KEY = /result|output|product/i

function dumpIsListed(id) {
  return DUMP_MODS.indexOf(String(id).split(':')[0]) >= 0
}

function dumpRecipe(r, recipes) {
  var id = String(r.getId())
  if (!dumpIsListed(id)) return

  var json = r.json
  var output = {}
  json.keySet().forEach(function (key) {
    var name = String(key)
    if (DUMP_OUTPUT_KEY.test(name)) output[name] = JsonIO.parse(String(json.get(name)))
  })

  recipes.push({ id: id, type: String(json.get('type').getAsString()), output: output })
}

ServerEvents.recipes(function (event) {
  var recipes = []
  var failed = 0
  var errors = []

  event.forEachRecipe({}, function (r) {
    try {
      dumpRecipe(r, recipes)
    } catch (e) {
      failed++
      if (errors.length < 3) errors.push(String(e))
    }
  })

  var items = []
  Item.getTypeList().forEach(function (id) {
    if (dumpIsListed(id)) items.push(String(id))
  })

  JsonIO.write('local/kubejs/dump_recipes.json', recipes)
  JsonIO.write('local/kubejs/dump_items.json', items)

  console.info('[_dump] recipes: ' + recipes.length + ', failed: ' + failed + ', items: ' + items.length)
  errors.forEach(function (e) { console.warn('[_dump] error: ' + e) })
})
