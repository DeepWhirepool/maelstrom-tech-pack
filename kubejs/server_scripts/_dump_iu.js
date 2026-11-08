// T31: полный JSON рецептов IU (хранилища, солнечные панели T1-4, машины переработки руд), чтобы узнать входы. Рецепты не меняет.
var IU_DUMP_IDS = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 517, 519, 521, 523,
  1322, 1323, 1402, 1403, 1404, 1405, 1406, 1407, 1174, 1335, 1338].map(function (n) { return 'industrialupgrade:industrialupgrade_' + n })

ServerEvents.recipes(function (event) {
  var out = []
  var failed = 0
  event.forEachRecipe({ mod: 'industrialupgrade' }, function (r) {
    var id = String(r.getId())
    if (IU_DUMP_IDS.indexOf(id) < 0) return
    try {
      var json = r.json
      if (!json) throw 'r.json is empty'
      out.push({ id: id, type: String(json.get('type').getAsString()), json: JsonIO.parse(String(json)) })
    } catch (e) {
      failed++
      out.push({ id: id, error: String(e) })
    }
  })
  JsonIO.write('local/kubejs/dump_iu.json', out)
  console.info('[_dump_iu] ' + out.length + ' recipes, ' + failed + ' failed')
})
