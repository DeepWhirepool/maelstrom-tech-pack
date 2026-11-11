// Creative-предметы новых модов в JEI не показывать (рецептов у них нет — jar angel_utilities/BuildingWands).
var HIDE_CREATIVE = ['angel_utilities:creative_energy_source', 'angel_utilities:creative_lava_source',
  'angel_utilities:creative_water_source', 'wands:creative_wand']
RecipeViewerEvents.removeEntries('item', event => HIDE_CREATIVE.forEach(id => event.remove(id)))
