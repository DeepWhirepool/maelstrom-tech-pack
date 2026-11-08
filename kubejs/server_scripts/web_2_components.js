// T7: кросс-мод паутина, итерация 2. Схемы и компоненты.
//
// Зачем: ключевые схемы и компоненты каждого мода требуют деталь другого мода, как корпуса в web_1.
// Уровни: Forestry, IE → IU → Mekanism → Ender IO, Industrial Foregoing → Powah, Oritech → AE2 → Draconic → Avaritia.
// Поздние предметы раннего мода (элитные/абсолютные схемы) могут требовать детали более позднего мода.
// Ингредиенты оригиналов взяты из jar модов. Стоимость ≈ оригинал + 1–2 детали.
// Петель нет: ни одна новая деталь и ни одна машина, на которой её делают, не требуют предмет, который она гейтит.
// Обходные рецепты схем (инфузия Mekanism, атомная кузница Oritech) удалены в T8, блок в конце файла.

var WEB2 = [
  {
    // Элитная схема Mekanism: + процессорный блок Oritech под рядом из оригинала.
    // Процессорный блок делают в ассемблере Oritech: машины Oritech схем Mekanism не требуют.
    old: 'mekanism:control_circuit/elite',
    id: 'kubejs:web_2/elite_control_circuit',
    add: function (e, id) {
      e.shaped('mekanism:elite_control_circuit', ['ACA', ' P '], {
        A: '#mekanism:alloys/reinforced',
        C: '#c:circuits/advanced',
        P: 'oritech:processing_unit'
      }).id(id)
    }
  },
  {
    // Абсолютная схема Mekanism: + нитро-кристалл Powah. Цепочка Powah (сфера, стержни, корпус) схем Mekanism не требует.
    old: 'mekanism:control_circuit/ultimate',
    id: 'kubejs:web_2/ultimate_control_circuit',
    add: function (e, id) {
      e.shaped('mekanism:ultimate_control_circuit', ['ACA', ' N '], {
        A: '#mekanism:alloys/atomic',
        C: '#c:circuits/elite',
        N: 'powah:crystal_nitro'
      }).id(id)
    }
  },
  {
    // Двухслойный конденсатор Ender IO: + сплав инфузии Mekanism в пустом углу (металлург. заправщик без конденсаторов).
    old: 'enderio:double_layer_capacitor',
    id: 'kubejs:web_2/double_layer_capacitor',
    add: function (e, id) {
      e.shaped('enderio:double_layer_capacitor', ['MI ', 'CDC', ' I '], {
        C: 'enderio:basic_capacitor',
        D: '#c:dusts/coal',
        I: '#c:ingots/energetic_alloy',
        M: 'mekanism:alloy_infused'
      }).id(id)
    }
  },
  {
    // Октадный конденсатор Ender IO: + укреплённый сплав Mekanism в пустом углу.
    old: 'enderio:octadic_capacitor',
    id: 'kubejs:web_2/octadic_capacitor',
    add: function (e, id) {
      e.shaped('enderio:octadic_capacitor', ['MI ', 'CGC', ' I '], {
        C: 'enderio:double_layer_capacitor',
        G: 'minecraft:glowstone',
        I: '#c:ingots/vibrant_alloy',
        M: 'mekanism:alloy_reinforced'
      }).id(id)
    }
  },
  {
    // Базовый конденсатор Powah: + базовый конденсатор Ender IO в пустом углу, выход 4 как в оригинале.
    old: 'powah:crafting/capacitor_basic',
    id: 'kubejs:web_2/powah_capacitor_basic',
    add: function (e, id) {
      e.shaped('4x powah:capacitor_basic', ['Eip', 'iri', 'pi '], {
        i: 'minecraft:iron_ingot',
        p: 'powah:dielectric_paste',
        r: 'minecraft:redstone_block',
        E: 'enderio:basic_capacitor'
      }).id(id)
    }
  },
  {
    // Процессорный блок Oritech: у ассемблера ровно 4 слота, поэтому редстоун-пыль заменена проводящим сплавом Ender IO.
    // Тип рецепта Oritech и время сохранены.
    old: 'oritech:assembler/processingunit',
    id: 'kubejs:web_2/processing_unit',
    add: function (e, id) {
      e.custom({
        type: 'oritech:assembler',
        ingredients: [
          { tag: 'c:plates/plastic' },
          { tag: 'c:carbon_fibre' },
          { tag: 'c:ingots/electrum' },
          { item: 'enderio:conductive_alloy_ingot' }
        ],
        results: [{ count: 1, id: 'oritech:processing_unit' }],
        time: 96
      }).id(id)
    }
  },
  {
    // Простая рамка Industrial Foregoing (камера растворения): один незерский кирпич заменён пустотным шасси Ender IO.
    // Шасси требует железо, зёрна бесконечности и сталь Mekanism, рамок IF не требует.
    old: 'industrialforegoing:dissolution_chamber/simple_machine_frame',
    id: 'kubejs:web_2/machine_frame_simple',
    add: function (e, id) {
      e.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
          { tag: 'c:plastics' },
          { tag: 'industrialforegoing:machine_frame/pity' },
          { tag: 'c:plastics' },
          { item: 'minecraft:nether_brick' },
          { item: 'enderio:void_chassis' },
          { tag: 'c:ingots/iron' },
          { tag: 'c:gears/gold' },
          { tag: 'c:ingots/iron' }
        ],
        inputFluid: { amount: 250, fluid: 'industrialforegoing:latex' },
        output: { count: 1, id: 'industrialforegoing:machine_frame_simple' },
        processingTime: 300
      }).id(id)
    }
  },




  {
    // Самая ранняя схема IU (circuit_part1, из неё делаются остальные части схем): кремень заменён
    // простой платой Forestry (Carpenter Forestry, раньше IU). Тип рецепта IU сохранён.
    old: 'industrialupgrade:industrialupgrade_435',
    id: 'kubejs:web_2/iu_circuit_part1',
    add: function (e, id) {
      e.custom({
        type: 'industrialupgrade:shaped_recipe',
        category: 'misc',
        key: {
          A: { tag: 'c:plates/iron' },
          B: { item: 'minecraft:gold_ingot' },
          C: { item: 'minecraft:redstone' },
          D: { item: 'forestry:basic_circuit_board' }
        },
        pattern: ['BAB', 'ADA', 'CAC'],
        result: { count: 1, id: 'industrialupgrade:circuit/circuit_part1' },
        show_notification: false
      }).id(id)
    }
  }
]

ServerEvents.recipes(function (event) {
  WEB2.forEach(function (r) {
    try {
      event.remove({ id: r.old })
      r.add(event, r.id)
    } catch (e) {
      console.error('[web_2] failed ' + r.id + ': ' + e)
    }
  })
})

// Проверка после загрузки: старые рецепты удалены, новые есть в менеджере рецептов.
ServerEvents.loaded(function (event) {
  try {
    var ids = {}
    event.server.recipeManager.getRecipes().forEach(function (holder) {
      ids[String(holder.id())] = true
    })
    var ok = 0
    WEB2.forEach(function (r) {
      if (ids[r.id] && !ids[r.old]) ok++
      else console.error('[web_2] not replaced: ' + r.old + ' (new: ' + !!ids[r.id] + ', old: ' + !!ids[r.old] + ')')
    })
    console.info('[web_2] replaced ' + ok + '/' + WEB2.length)
  } catch (e) {
    console.error('[web_2] check failed: ' + e)
  }
})

// T8: закрываем обходы гейтов web_2. Без этого предмет делается в обход нового рецепта, и паутина теряет смысл.
// Распаковку и рецепты из более дорогих предметов не удаляем (блок кристальной матрицы → 9 слитков остаётся).
// Предметы остаются доступными: рецепты верстака из блока выше (п.1–2) делаются без этих машин.
var WEB2_BYPASS = [
  // Гейт п.1 (элитная схема Mekanism + процессорный блок Oritech), обход: инфузия улучшенной схемы алмазом.
  'mekanism:control_circuit/infused_elite',
  // Тот же гейт, обход: compat-рецепт атомной кузницы Oritech (алмазная пыль + улучшенная схема).
  'oritech:atomicforge/compat/mekanism/elite_control_circuit',
  // Гейт п.2 (абсолютная схема Mekanism + нитро-кристалл Powah), обход: инфузия элитной схемы обсидианом.
  'mekanism:control_circuit/infused_ultimate',
  // Тот же гейт, обход: compat-рецепт атомной кузницы Oritech (пыль очищ. обсидиана + элитная схема).
  'oritech:atomicforge/compat/mekanism/ultimate_control_circuit'
]

ServerEvents.recipes(function (event) {
  WEB2_BYPASS.forEach(function (id) {
    event.remove({ id: id })
  })
})

ServerEvents.loaded(function (event) {
  try {
    var left = []
    event.server.recipeManager.getRecipes().forEach(function (holder) {
      if (WEB2_BYPASS.indexOf(String(holder.id())) >= 0) left.push(String(holder.id()))
    })
    if (left.length) console.error('[web_2] bypass not removed: ' + left.join(', '))
    console.info('[web_2] bypasses removed ' + (WEB2_BYPASS.length - left.length) + '/' + WEB2_BYPASS.length)
  } catch (e) {
    console.error('[web_2] bypass check failed: ' + e)
  }
})
