// P3г: QE в паке не получить — конвертер EF/QE и модуль QE скрыты (рецепты отключены в kubejs/data/industrialupgrade).
RecipeViewerEvents.removeEntries('item', event => ['powerutils:converter/power_utilities_qe', 'powerutils:module_qe'].forEach(id => event.remove(id)))
