// T46: закрыть тупики из проверки проходимости (_ai/tools/reach.py).
ServerEvents.recipes(function (event) {
  // sunnariumpart: в IU нет источника (только вход Sunnarium Maker), а от него зависят 173 рецепта — даём Powah energizing
  event.custom({
    type: 'powah:energizing', energy: 200000,
    ingredients: [{ item: 'minecraft:glowstone_dust' }, { item: 'minecraft:glowstone_dust' }, { item: 'minecraft:glowstone_dust' },
      { item: 'minecraft:glowstone_dust' }, { item: 'kubejs:fluorite_dust' }],
    result: { count: 1, id: 'industrialupgrade:itemsunnarium/sunnariumpart' }
  }).id('kubejs:fixes_reach/sunnariumpart')

  // ammonium_chloride_dust: рецепта нет ни в IU (включая smeltery), ни в других модах — хлорная химия IU стояла.
  // PRC Mekanism: костная мука (азот) + вода + хлороводород
  event.custom({
    type: 'mekanism:reaction',
    item_input: { count: 1, item: 'minecraft:bone_meal' },
    fluid_input: { amount: 100, tag: 'minecraft:water' },
    chemical_input: { amount: 100, chemical: 'mekanism:hydrogen_chloride' },
    item_output: { count: 1, id: 'industrialupgrade:itemdust/ammonium_chloride_dust' },
    duration: 100,
    energy_required: 5000
  }).id('kubejs:fixes_reach/ammonium_chloride_dust')

  // cooling_mixture: у предмета IU нет рецепта, а он нужен охладителям и машинам Maelstrom (thermal_insulator и др.)
  event.custom({
    type: 'mekanism:reaction',
    item_input: { count: 1, item: 'minecraft:packed_ice' },
    fluid_input: { amount: 250, tag: 'minecraft:water' },
    chemical_input: { amount: 100, chemical: 'mekanism:hydrogen' },
    item_output: { count: 2, id: 'industrialupgrade:cooling_mixture' },
    duration: 100,
    energy_required: 10000
  }).id('kubejs:fixes_reach/cooling_mixture')

  // cryogenic_cooling_mixture: оригинал требует жидкий криоген IU без источника — дорогая замена через PRC
  event.custom({
    type: 'mekanism:reaction',
    item_input: { count: 1, item: 'industrialupgrade:cooling_mixture' },
    fluid_input: { amount: 500, tag: 'minecraft:water' },
    chemical_input: { amount: 500, chemical: 'mekanism:hydrogen' },
    item_output: { count: 1, id: 'industrialupgrade:cryogenic_cooling_mixture' },
    duration: 200,
    energy_required: 50000
  }).id('kubejs:fixes_reach/cryogenic_cooling_mixture')

  // полиэтилен/полипропилен IU (предмет): жидкости есть из нефти, но машины-выхода в предмет нет — нужны для upgrade_casing -> overclocker
  ;[['iufluidpolyeth', 'crafting_483_element'], ['iufluidpolyprop', 'crafting_484_element']].forEach(function (p) {
    event.custom({
      type: 'mekanism:reaction',
      item_input: { count: 1, item: 'mekanism:dust_coal' },
      fluid_input: { amount: 250, fluid: 'industrialupgrade:' + p[0] },
      chemical_input: { amount: 50, chemical: 'mekanism:hydrogen' },
      item_output: { count: 1, id: 'industrialupgrade:crafting_elements/' + p[1] },
      duration: 100,
      energy_required: 10000
    }).id('kubejs:fixes_reach/' + p[1])
  })
  // T48: пыль дракония — источника нет (дробилок для руды DE в сборке нет), а нужна слиткам/обсидиану DE и ядрам IU.
  // Обогатитель Mekanism: руда DE → 2 пыли, как обычное удвоение руды
  event.custom({ type: 'mekanism:enriching', input: { count: 1, tag: 'c:ores/draconium' },
    output: { count: 2, id: 'draconicevolution:draconium_dust' } }).id('kubejs:fixes_reach/draconium_dust')

  // T48: пыль лазурита IU — нет рецепта, а нужна лапотронному кристаллу IU, фотоэлементу и изоляции Ender IO. Дробитель Mekanism
  event.custom({ type: 'mekanism:crushing', input: { count: 1, item: 'minecraft:lapis_lazuli' },
    output: { count: 1, id: 'industrialupgrade:itemdust/lapis_dust' } }).id('kubejs:fixes_reach/lapis_dust')

  // T48: селитра — пыль есть только у IE, а руда только у IU; без неё стоят биодизель и удобрение IE. Дробилка IE: сырьё IU → 2 пыли
  event.custom({ type: 'immersiveengineering:crusher', energy: 3200, input: { item: 'industrialupgrade:raw_saltpeter/raw_saltpeter' },
    result: { item: 'immersiveengineering:dust_saltpeter' }, secondaries: [{ chance: 1.0, output: { item: 'immersiveengineering:dust_saltpeter' } }] })
    .id('kubejs:fixes_reach/dust_saltpeter')
  // DAY5: спектральная панель IU спрятана (панели выше квантовой — наши), а шлем из неё нужен upgrademodule → четверные машины.
  // Вместо неё — наша дисперсионная панель того же места в лестнице (replaceInput тип IU не берёт — пересоздаём, тип IU сохранён)
  event.remove({ id: 'industrialupgrade:industrialupgrade_460' })
  event.custom({ type: 'industrialupgrade:shaped_recipe', category: 'misc', pattern: [' A ', ' C ', 'BEB'],
    key: { A: { item: 'maelstromtech:dispersion_solar_panel' }, B: { item: 'industrialupgrade:quantumitems4' },
      C: { item: 'industrialupgrade:armour/spectral_helmet' }, E: { item: 'industrialupgrade:compresscarbonultra' } },
    result: { count: 1, id: 'industrialupgrade:armour/spectral_solar_helmet' }, show_notification: false }).id('kubejs:fixes_reach/spectral_solar_helmet')

  // DAY5: гелий IU давал только камень Энцелада (космос спрятан) в разделителе IU; рецепт разделителя в коде IU, replaceInput не достаёт.
  // Тот же «камень → газ» на центрифуге Oritech: кристалл флюорита (уровень охлаждающей смеси) + вода → гелий для helium_cooling_mixture
  event.custom({ type: 'oritech:centrifuge_fluid', fluidInput: { fluid: 'minecraft:water', amount: 1000 },
    fluidOutputs: [{ fluid: 'industrialupgrade:iufluidhelium', amount: 500 }], ingredients: [{ item: 'kubejs:fluorite_crystal' }],
    results: [], time: 100 }).id('kubejs:fixes_reach/helium')
  console.info('[check] fixes_reach: 11 recipes')
})
