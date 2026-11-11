// T71 модули IU: прячем в JEI модули спавнера/мобов, бесконечной воды, космоса и лишние тиры. Таблица: _ai/iu_modules.md.
// Рецепты этих предметов убирает server_scripts/hide_iu_modules.js.
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

RecipeViewerEvents.removeEntries('item', function (event) {
  var ok = 0
  HIDE_IU_MODULES.forEach(function (id) {
    try { event.remove(id); ok++ } catch (e) { console.error('[hide_iu_modules] not hidden ' + id + ': ' + e) }
  })
  console.info('[hide_iu_modules] JEI items hidden: ' + ok + '/' + HIDE_IU_MODULES.length)
})
