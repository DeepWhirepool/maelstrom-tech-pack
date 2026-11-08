// T5: кросс-мод паутина, итерация 1. Корпуса и рамки машин.
//
// Зачем: базовый корпус каждого мода требует деталь из мода того же или более раннего уровня.
// Так моды сборки нельзя проходить по отдельности.
// Уровни: Forestry, IE → IU → Mekanism → Ender IO, Industrial Foregoing → Powah, Oritech → AE2 → Draconic → Avaritia.
// T11: Create удалён из сборки, его детали заменены деталями Forestry, IE и IU.
// Ингредиенты оригиналов взяты из jar модов. Форма сетки старается сохранить стоимость оригинала.
// Тупиков нет: ни одна новая деталь и ни одна машина, на которой её делают, не требуют корпус, который она гейтит.
// Пункт 5 (mekanism:advanced_control_circuit) добавлен в T6: меняется только рецепт верстака,
// обходные рецепты (инфузия Mekanism, атомная кузница Oritech) удалены в T8, блок в конце файла.

var WEB1 = [
  {
    // Ящик Forestry: бронза + железная механическая деталь IE (тот же уровень, T11: вместо андезитового сплава Create).
    old: 'forestry:sturdy_casing',
    id: 'kubejs:web_1/sturdy_casing',
    add: function (e, id) {
      e.shaped('forestry:sturdy_casing', ['###', '#A#', '###'], {
        '#': '#c:ingots/bronze',
        A: 'immersiveengineering:component_iron'
      }).id(id)
    }
  },
  {
    // Лёгкий корпус IE: один лист железа заменён медной шестернёй Forestry (тот же уровень, T11: вместо андезитового сплава Create).
    old: 'immersiveengineering:crafting/light_engineering',
    id: 'kubejs:web_1/light_engineering',
    add: function (e, id) {
      e.shaped('4x immersiveengineering:light_engineering', ['igi', 'gcg', 'iai'], {
        i: '#c:sheetmetals/iron',
        g: 'immersiveengineering:component_iron',
        c: '#c:ingots/copper',
        a: 'forestry:copper_gear'
      }).id(id)
    }
  },
  {
    // Тяжёлый корпус IE: один лист стали заменён бронзовой шестернёй Forestry (тот же уровень).
    old: 'immersiveengineering:crafting/heavy_engineering',
    id: 'kubejs:web_1/heavy_engineering',
    add: function (e, id) {
      e.shaped('4x immersiveengineering:heavy_engineering', ['igi', 'geg', 'ibi'], {
        i: '#c:sheetmetals/steel',
        g: 'immersiveengineering:component_steel',
        e: '#c:ingots/electrum',
        b: 'forestry:bronze_gear'
      }).id(id)
    }
  },
  {
    // Корпус машин IU (база всех машин IU): 4 корпусные пластины как в оригинале + ящик Forestry в центре.
    // Тип рецепта IU сохранён.
    old: 'industrialupgrade:industrialupgrade_763',
    id: 'kubejs:web_1/iu_machine_casing',
    add: function (e, id) {
      e.custom({
        type: 'industrialupgrade:shaped_recipe',
        category: 'misc',
        key: {
          A: { item: 'industrialupgrade:crafting_elements/crafting_137_element' },
          S: { item: 'forestry:sturdy_casing' }
        },
        pattern: ['A A', ' S ', 'A A'],
        result: { count: 1, id: 'industrialupgrade:blockresource/machine' },
        show_notification: false
      }).id(id)
    }
  },
  {
    // Стальной корпус Mekanism: первая часть схемы IU (circuit_part1, рецепт industrialupgrade_435) в центре,
    // осмий сдвинут на место одного стекла. T11: вместо точного механизма Create. IU раньше Mekanism, петли нет.
    old: 'mekanism:steel_casing',
    id: 'kubejs:web_1/steel_casing',
    add: function (e, id) {
      e.shaped('mekanism:steel_casing', ['SGS', 'GPG', 'SOS'], {
        S: '#c:ingots/steel',
        G: '#c:glass_blocks/cheap',
        O: '#c:ingots/osmium',
        P: 'industrialupgrade:circuit/circuit_part1'
      }).id(id)
    }
  },
  {
    // Улучшенная схема Mekanism (T6): один из двух сплавов инфузии заменён проводящим сплавом Ender IO.
    // Петли нет: проводящий сплав = железо + медь в плавильне сплавов Ender IO, её шасси требует сталь, а не схему.
    old: 'mekanism:control_circuit/advanced',
    id: 'kubejs:web_1/advanced_control_circuit',
    add: function (e, id) {
      e.shaped('mekanism:advanced_control_circuit', ['ACE'], {
        A: '#mekanism:alloys/infused',
        C: '#c:circuits/basic',
        E: 'enderio:conductive_alloy_ingot'
      }).id(id)
    }
  },
  {
    // Пустотное шасси Ender IO: стальной слиток Mekanism в пустом центре.
    old: 'enderio:void_chassis',
    id: 'kubejs:web_1/void_chassis',
    add: function (e, id) {
      e.shaped('enderio:void_chassis', ['IGI', 'GSG', 'IGI'], {
        I: '#c:ingots/iron',
        G: '#c:dusts/grains_of_infinity',
        S: 'mekanism:ingot_steel'
      }).id(id)
    }
  },
  {
    // Простая рамка Industrial Foregoing: одно бревно заменено пропитанным корпусом Forestry.
    old: 'industrialforegoing:machine_frame_pity',
    id: 'kubejs:web_1/machine_frame_pity',
    add: function (e, id) {
      e.shaped('industrialforegoing:machine_frame_pity', ['WIW', 'IRI', 'WCW'], {
        W: '#minecraft:logs',
        I: '#c:ingots/iron',
        R: '#c:storage_blocks/redstone',
        C: 'forestry:impregnated_casing'
      }).id(id)
    }
  },
  {
    // Диэлектрический корпус Powah: пластик Industrial Foregoing в пустом центре.
    old: 'powah:crafting/dielectric_casing',
    id: 'kubejs:web_1/dielectric_casing',
    add: function (e, id) {
      e.shaped('powah:dielectric_casing', ['ihi', 'vPv', 'ihi'], {
        i: 'minecraft:iron_ingot',
        h: 'powah:dielectric_rod_horizontal',
        v: 'powah:dielectric_rod',
        P: 'industrialforegoing:plastic'
      }).id(id)
    }
  },
  {
    // Рамка машин Oritech: 2 стальные пластины IE в пустых углах, выход 16 как в оригинале (T11: вместо латунных листов Create).
    old: 'oritech:crafting/frame',
    id: 'kubejs:web_1/oritech_frame',
    add: function (e, id) {
      e.shaped('16x oritech:machine_frame_block', ['bsb', 'csc', ' s '], {
        b: 'immersiveengineering:plate_steel',
        s: 'minecraft:iron_bars',
        c: '#c:ingots/nickel'
      }).id(id)
    }
  },
  {
    // Контроллер AE2: два блока небесного камня заменены улучшенной схемой Mekanism и энергетическим сплавом Ender IO.
    old: 'ae2:network/blocks/controller',
    id: 'kubejs:web_1/ae2_controller',
    add: function (e, id) {
      // T36 (web_6): верхний флюикс-кристалл → заряженный флюорит (тир 1 кристаллов)
      e.shaped('ae2:controller', ['aXa', 'bcb', 'EbM'], {
        X: 'kubejs:energized_fluorite_crystal',
        a: 'ae2:smooth_sky_stone_block',
        b: 'ae2:fluix_crystal',
        c: 'ae2:engineering_processor',
        E: 'enderio:energetic_alloy_ingot',
        M: 'mekanism:advanced_control_circuit'
      }).id(id)
    }
  },
  {
    // Ядро крафта Draconic: два лазуритовых блока заменены атомным сплавом Mekanism и инженерным процессором AE2.
    old: 'draconicevolution:machines/crafting_core',
    id: 'kubejs:web_1/crafting_core',
    add: function (e, id) {
      e.shaped('draconicevolution:crafting_core', ['XBA', 'BCB', 'ABP'], {
        A: '#c:storage_blocks/lapis',
        B: '#c:gems/diamond',
        C: 'draconicevolution:draconium_core',
        X: 'mekanism:alloy_atomic',
        P: 'ae2:engineering_processor'
      }).id(id)
    }
  },
  {
    // Экстремальный верстак Avaritia: две алмазные решётки в верхнем ряду заменены ядром виверны Draconic
    // и абсолютной схемой Mekanism. Тип рецепта и уровень стола Avaritia сохранены.
    old: 'avaritia:extreme_crafting_table',
    id: 'kubejs:web_1/extreme_crafting_table',
    add: function (e, id) {
      e.custom({
        type: 'avaritia:shaped_table',
        key: {
          a: { item: 'avaritia:double_compressed_crafting_table' },
          b: { item: 'minecraft:lodestone' },
          c: { item: 'avaritia:diamond_lattice' },
          d: { item: 'avaritia:crystal_matrix_ingot' },
          e: { item: 'avaritia:crystal_matrix' },
          f: { item: 'minecraft:recovery_compass' },
          g: { item: 'minecraft:dragon_egg' },
          h: { item: 'minecraft:beacon' },
          i: { item: 'minecraft:reinforced_deepslate' },
          j: { item: 'minecraft:netherite_block' },
          k: { item: 'minecraft:heart_of_the_sea' },
          W: { item: 'draconicevolution:wyvern_core' },
          U: { item: 'mekanism:ultimate_control_circuit' },
          T: { item: 'kubejs:circuit_board_t4' } // T37: вместо нижнего левого магнитного камня
        },
        pattern: [
          'bWcfcUb',
          'cddgddc',
          'cdihidc',
          'cdiaidc',
          'cdjkjdc',
          'cdddddc',
          'Teeeeeb'
        ],
        result: { count: 1, id: 'avaritia:extreme_crafting_table' },
        tier: 3
      }).id(id)
    }
  }
]

ServerEvents.recipes(function (event) {
  WEB1.forEach(function (r) {
    try {
      event.remove({ id: r.old })
      r.add(event, r.id)
    } catch (e) {
      console.error('[web_1] failed ' + r.id + ': ' + e)
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
    WEB1.forEach(function (r) {
      if (ids[r.id] && !ids[r.old]) ok++
      else console.error('[web_1] not replaced: ' + r.old + ' (new: ' + !!ids[r.id] + ', old: ' + !!ids[r.old] + ')')
    })
    console.info('[web_1] replaced ' + ok + '/' + WEB1.length)
  } catch (e) {
    console.error('[web_1] check failed: ' + e)
  }
})

// T8: закрываем обходы гейтов web_1. Без этого предмет делается в обход нового рецепта, и паутина теряет смысл.
// Распаковку и рецепты из более дорогих предметов не удаляем (у гейтов web_1 таких нет).
// Предмет остаётся доступным: рецепт верстака из блока выше (п.5) делается без этих машин.
var WEB1_BYPASS = [
  // Гейт п.5 (улучшенная схема Mekanism + проводящий сплав Ender IO), обход: инфузия базовой схемы редстоуном.
  'mekanism:control_circuit/infused_advanced',
  // Тот же гейт, обход: compat-рецепт атомной кузницы Oritech (редстоун + базовая схема).
  'oritech:atomicforge/compat/mekanism/advanced_control_circuit'
]

ServerEvents.recipes(function (event) {
  WEB1_BYPASS.forEach(function (id) {
    event.remove({ id: id })
  })
})

ServerEvents.loaded(function (event) {
  try {
    var left = []
    event.server.recipeManager.getRecipes().forEach(function (holder) {
      if (WEB1_BYPASS.indexOf(String(holder.id())) >= 0) left.push(String(holder.id()))
    })
    if (left.length) console.error('[web_1] bypass not removed: ' + left.join(', '))
    console.info('[web_1] bypasses removed ' + (WEB1_BYPASS.length - left.length) + '/' + WEB1_BYPASS.length)
  } catch (e) {
    console.error('[web_1] bypass check failed: ' + e)
  }
})
