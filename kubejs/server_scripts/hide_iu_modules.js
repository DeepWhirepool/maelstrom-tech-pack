// T71 модули IU: убираем рецепты модулей, которые прячем в JEI (client_scripts/hide_iu_modules.js).
// Зачем: спавнер/мобы не делаем, бесконечная вода ломает баланс, космос скрыт (T10),
// старшие тиры-дубли (оставляем 3 тира эффекта). Таблица решений: _ai/iu_modules.md.
// Предметы не удаляем (их регистрирует мод), только рецепты, где они на выходе.
var HIDE_IU_MODULES = [
  'industrialupgrade:spawnermodules/spawner_module', 'industrialupgrade:spawnermodules/spawner_module1',
  'industrialupgrade:spawnermodules/spawner_module2', 'industrialupgrade:spawnermodules/spawner_module3',
  'industrialupgrade:spawnermodules/spawner_module4', 'industrialupgrade:spawnermodules/spawner_module5',
  'industrialupgrade:spawnermodules/spawner_module6', 'industrialupgrade:spawnermodules/spawner_module7',
  'industrialupgrade:spawnermodules/spawner_module8',
  'industrialupgrade:entitymodules/module_mob', 'industrialupgrade:entitymodules/module_player',
  'industrialupgrade:module_infinity_water',
  'industrialupgrade:reactormodules/capacitor3', 'industrialupgrade:reactormodules/componentvent3',
  'industrialupgrade:reactormodules/exchanger3', 'industrialupgrade:reactormodules/generation3',
  'industrialupgrade:reactormodules/radiation3', 'industrialupgrade:reactormodules/stableheat3',
  'industrialupgrade:reactormodules/vent3',
  'industrialupgrade:quarrymodules/ef3', 'industrialupgrade:quarrymodules/ef4',
  'industrialupgrade:upgrademodules/upgrademodule47', 'industrialupgrade:upgrademodules/upgrademodule48',
  'industrialupgrade:upgrademodules/upgrademodule49'
]

function hideIuModOuts(el, acc) {
  if (el == null || el.isJsonNull()) return
  if (el.isJsonPrimitive()) acc.push(String(el.getAsString()))
  else if (el.isJsonArray()) { for (var i = 0; i < el.size(); i++) hideIuModOuts(el.get(i), acc) }
  else if (el.isJsonObject()) { var it = el.keySet().iterator(); while (it.hasNext()) hideIuModOuts(el.get(it.next()), acc) }
}

ServerEvents.recipes(function (event) {
  var set = {}
  HIDE_IU_MODULES.forEach(function (id) { set[id] = true })
  var ids = []
  event.forEachRecipe({}, function (r) {
    try {
      var json = r.json, outs = []
      ;['result', 'results', 'output', 'outputs'].forEach(function (k) { if (json.has(k)) hideIuModOuts(json.get(k), outs) })
      for (var i = 0; i < outs.length; i++) if (set[outs[i]]) { ids.push(String(r.getId())); return }
    } catch (e) {}
  })
  ids.forEach(function (id) { event.remove({ id: id }) })
  console.info('[hide_iu_modules] items: ' + HIDE_IU_MODULES.length + ', recipes removed: ' + ids.length)
})
