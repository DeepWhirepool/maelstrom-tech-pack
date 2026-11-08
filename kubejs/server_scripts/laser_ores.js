// T12: редкие металлы IU — только через лазерный бур Industrial Foregoing (как в LoliLand).
// Зачем: в мире остаются базовые руды; металлы, которые не нужны ранним машинам IU, и космические
// металлы (на планеты в сборке не летают) добываются буром. Генерация этих руд выключена в kubejs/data.
// Глубина и биомы не ограничены. Выход: raw IU, если есть, иначе блок руды.
// Ruby не добавлен: у IF уже есть рецепт ores/ruby по тегу c:ores/ruby (в него входит руда IU).

var LASER_ORES = [
  // [выход, линза, вес]
  ['raw_metals/raw_arsenic', 'gray', 6],
  ['raw_metals/raw_barium', 'white', 6],
  ['raw_metals/raw_bismuth', 'pink', 6],
  ['raw_metals/raw_cadmium', 'light_gray', 6],
  ['raw_metals/raw_gadolinium', 'cyan', 6],
  ['raw_metals/raw_gallium', 'light_blue', 6],
  ['raw_metals/raw_hafnium', 'gray', 6],
  ['raw_metals/raw_molybdenum', 'black', 6],
  ['raw_metals/raw_neodymium', 'magenta', 6],
  ['raw_metals/raw_niobium', 'blue', 6],
  ['raw_metals/raw_palladium', 'white', 6],
  ['raw_metals/raw_polonium', 'lime', 6],
  ['raw_metals/raw_strontium', 'yellow', 6],
  ['raw_metals/raw_tantalum', 'black', 6],
  ['raw_metals/raw_thallium', 'green', 6],
  ['raw_metals/raw_yttrium', 'light_gray', 6],
  ['raw_metals/raw_zirconium', 'orange', 6],
  // радиоактивные — реже
  ['blockradiationore/americium_ore', 'lime', 3],
  ['blockradiationore/curium_ore', 'magenta', 3],
  ['blockradiationore/neptunium_ore', 'cyan', 3],
  ['thorium_ore/thorium_ore', 'green', 3],
  // космические металлы
  ['blockspace2/mars_adamantium_ore', 'red', 3],
  ['blockspace3/mercury_mithril_ore', 'light_blue', 3],
  ['blockspace/deimos_orichalcum_ore', 'orange', 3],
  ['blockspace3/mimas_bloodstone', 'red', 3],
  ['baseore1/beryllium', 'green', 4],
  ['baseore1/lithium', 'pink', 4],
  ['baseore1/bor', 'brown', 4],
  // T14: руды, убранные из мира (рано — побочка дробилки IE, iu_byproducts.js). Iridium и sulfur уже есть у IF по тегу.
  ['raw_metals/raw_chromium', 'white', 6],
  ['raw_metals/raw_germanium', 'light_gray', 6],
  ['raw_metals/raw_magnesium', 'white', 6],
  ['raw_metals/raw_manganese', 'brown', 6],
  ['raw_metals/raw_spinel', 'pink', 6],
  ['raw_metals/raw_vanadium', 'black', 6],
  ['raw_metals/raw_zinc', 'light_gray', 6],
  ['baseore1/calcium', 'white', 6],
  ['raw_saltpeter/raw_saltpeter', 'white', 6]
]

ServerEvents.recipes(function (event) {
  LASER_ORES.forEach(function (o) {
    event.custom({
      type: 'industrialforegoing:laser_drill_ore',
      catalyst: { item: 'industrialforegoing:' + o[1] + '_laser_lens' },
      output: { count: 1, item: 'industrialupgrade:' + o[0] },
      rarity: [{
        biome_filter: { blacklist: [], whitelist: [] },
        dimension_filter: { blacklist: [], whitelist: [] },
        depth_min: 0, depth_max: 255, weight: o[2]
      }]
    }).id('kubejs:laser_ores/' + o[0].split('/')[1])
  })
  console.info('[laser_ores] added: ' + LASER_ORES.length)
})
