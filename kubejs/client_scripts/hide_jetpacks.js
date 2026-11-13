// T104: джетпаки Oritech и Mekanism скрыты в JEI (рецепты убраны в server_scripts/jetpacks_t104.js); в паке — ранцы IU
RecipeViewerEvents.removeEntries('item', function (event) {
  ;['oritech:jetpack', 'oritech:exo_jetpack', 'mekanism:jetpack', 'mekanism:jetpack_armored'].forEach(function (id) { event.remove(id) })
})
