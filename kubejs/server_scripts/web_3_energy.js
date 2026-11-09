// T29: web_3 энергетика. Хранилища и генераторы разных модов делятся на 3 тира, тир задаёт кристалл Э3:
// тир 1 — флюорит (Mekanism), тир 2 — хризолит (лазерный бур IF), тир 3 — заряженный аметрин (бур IF + орб Powah).
// Так энергетика любого мода требует деталей Mekanism, IF и Powah. Рецепты не пишутся заново:
// в существующем рецепте одна ячейка сетки заменяется кристаллом (для слияния Draconic кристалл добавляется).
// Правка через r.json + r.save() (как в iu_easy_recipes.js) — работает для любого типа рецепта, в т.ч. mek_data.
// IU (T34): хранилища и солнечные панели — тот же способ, тип industrialupgrade:shaped_recipe.

var F = 'kubejs:fluorite_crystal', EF = 'kubejs:energized_fluorite_crystal', C = 'kubejs:chrysolite_crystal'
var A = 'kubejs:ametrine_crystal', EA = 'kubejs:energized_ametrine_crystal'

// [id рецепта, строка, столбец, кристалл]; ячейка выбрана так, чтобы осталась основа рецепта (корпус, прошлый тир)
var WEB3_SLOT = [
  // Mekanism: кубы — верхний энергопланшет; генераторы — одна деталь из центра/верха
  ['mekanism:energy_cube/basic', 0, 1, F],
  ['mekanism:energy_cube/advanced', 0, 1, EF],
  ['mekanism:energy_cube/elite', 0, 1, C],
  ['mekanism:energy_cube/ultimate', 0, 1, EA],
  ['mekanismgenerators:generator/solar', 1, 0, F], // T34: вместо одного из двух сплавов (центр — единственный слиток)
  ['mekanismgenerators:generator/heat', 0, 1, F], // T34: вместо одного из трёх слитков железа
  ['mekanismgenerators:generator/wind', 0, 0, C], // T34: пустой угол
  ['mekanismgenerators:generator/gas_burning', 0, 1, C],
  ['mekanismgenerators:reactor/controller', 0, 0, EA], // T34: вместо одной из двух ultimate-схем
  // Powah: ячейки — верхний конденсатор (basic_2 — путь через starter, тоже закрыт); генераторы basic — тир 1
  ['powah:crafting/energy_cell_basic', 0, 1, F],
  ['powah:crafting/energy_cell_basic_2', 0, 1, F],
  ['powah:crafting/energy_cell_hardened', 0, 1, F],
  ['powah:crafting/energy_cell_blazing', 0, 1, C],
  ['powah:crafting/energy_cell_niotic', 0, 1, C],
  ['powah:crafting/energy_cell_spirited', 0, 1, EA],
  ['powah:crafting/energy_cell_nitro', 0, 1, EA],
  ['powah:crafting/reactor_basic', 0, 1, F], // T34: вместо одного из 4 больших конденсаторов (уранинит один)
  ['powah:crafting/thermo_generator_basic', 0, 0, F], // T34: вместо одной из двух диэлектрических паст
  ['powah:crafting/solar_panel_basic', 2, 1, F],
  // Ender IO: банк конденсаторов (оба рецепта advanced, чтобы не было обхода)
  ['enderio:basic_capacitor_bank', 0, 1, F],
  ['enderio:advanced_capacitor_bank', 0, 1, C],
  ['enderio:advanced_capacitor_bank_upgrade', 0, 1, C], // T34: вместо одного из 6 энергетических слитков
  // Flux Networks: пустой центр сетки
  ['fluxnetworks:basic_flux_storage', 1, 1, C],
  ['fluxnetworks:gargantuan_flux_storage', 1, 1, EA],
  // Draconic: ядро, стабилизаторы (пустая ячейка), пилоны (вместо алмаза)
  ['draconicevolution:machines/energy_core', 0, 1, EA],
  ['draconicevolution:machines/energy_core_stabilizer', 0, 1, A],
  ['draconicevolution:machines/energy_pylon', 1, 0, A], // T34: вместо одного из двух изумрудов (алмаз один)
  // T34 IU: хранилища и солнечные панели (тип industrialupgrade:shaped_recipe) — тот же кристалл тира
  // T58: 31–36 (batbox…ult_mfsu) заменены рецептами LoliLand (ll_ic2.js)
  ['industrialupgrade:industrialupgrade_37', 0, 0, EA], ['industrialupgrade:industrialupgrade_38', 0, 0, EA], ['industrialupgrade:industrialupgrade_39', 0, 0, EA],
  ['industrialupgrade:industrialupgrade_40', 2, 0, EA], ['industrialupgrade:industrialupgrade_41', 2, 0, EA],
  ['industrialupgrade:industrialupgrade_519', 1, 0, EF], // T58: 517 — рецепт LoliLand (ll_ic2.js)
  ['industrialupgrade:industrialupgrade_521', 1, 0, C], ['industrialupgrade:industrialupgrade_523', 1, 0, EA]
]
// [id слияния Draconic, сколько заряженного аметрина добавить]
var WEB3_FUSION = [
  // T59: ядро реактора — рецепт LoliLand (ll_draconic.js)
  ['draconicevolution:machines/reactor_stabilizer', 1]
]

// T34: общая для web_3 и web_4 (web_4 грузится позже). Ставит предмет в ячейку [row, col] под свободным символом;
// если заменённого символа в сетке больше нет — убирает его из key (иначе «Key defines symbols that aren't used»).
function webSetCell(r, row, col, item) {
  var json = r.json, pattern = json.getAsJsonArray('pattern'), key = json.getAsJsonObject('key')
  var line = String(pattern.get(row).getAsString()), old = line.charAt(col)
  var sym = ['Z', '9', '8', '7'].filter(function (c) { return !key.has(c) })[0]
  pattern.set(row, JsonIO.parseRaw(JSON.stringify(line.substring(0, col) + sym + line.substring(col + 1))))
  key.add(sym, JsonIO.parseRaw(JSON.stringify({ item: item })))
  var rows = ''
  for (var i = 0; i < pattern.size(); i++) rows += pattern.get(i).getAsString()
  if (old != ' ' && rows.indexOf(old) < 0) key.remove(old)
  r.save()
}

ServerEvents.recipes(function (event) {
  var done = []
  WEB3_SLOT.forEach(function (s) {
    event.forEachRecipe({ id: s[0] }, function (r) {
      webSetCell(r, s[1], s[2], s[3])
      done.push(s[0])
    })
  })
  WEB3_FUSION.forEach(function (f) {
    event.forEachRecipe({ id: f[0] }, function (r) {
      var ings = r.json.getAsJsonArray('ingredients')
      for (var i = 0; i < f[1]; i++) ings.add(JsonIO.parseRaw(JSON.stringify({ consume: true, ingredient: { item: EA } })))
      r.save()
      done.push(f[0])
    })
  })
  var missing = WEB3_SLOT.concat(WEB3_FUSION).map(function (x) { return x[0] }).filter(function (id) { return done.indexOf(id) < 0 })
  console.info('[web_3] ' + done.length + ' recipes' + (missing.length ? ', not found: ' + missing.join(', ') : ''))
})

// ---- T75 панели: солнечные панели Maelstrom Tech после квантовой IU (8 тиров, порядок LoliLand по рецептам, T76).
// Зачем: идея LoliLand — тир = 2 предыдущие панели + панель на тир ниже + деталь тира (у LL ядра lolienergistics,
// у нас вместо них материалы паутины по возрастанию: заряженные кристаллы → звёздная материя/пульсирующий энергон →
// нейтронная звезда → жидкие сингулярности T67 → звёздное ядро/бесконечность). В каждом рецепте детали 3+ модов.
// Сетка: M X M / P Q P / K C K  (P — предыдущая ×2, Q — на тир ниже, X — деталь тира, M/K — материалы модов, C — плата)
// DAY2: как у LL — в панели солнечное ядро тира (S, kubejs:solar_coreN, ll_cores.js) и материя тира (A, ll_matter.js);
// сетка M X M / P S P / Q A K, плата C ушла внутрь солнечного ядра.
// DAY4 (баланс 2–3 ч/день): 1 предыдущая панель (в центре), без «тир ниже на 2»: M X M / S P A / K M K —
// на антиматериальную нужна 1 квантовая панель IU, а не 408 дисперсионных.
var WEB3_MATTER = ['loose_pink', 'luminous_pink', 'mutated_violet_turquoise', 'turquoise', 'purple', 'luminous_turquoise', 'luminous_red', 'loose_blue']
var WEB3_PANELS = [
  // [тир, X, M, K, C]
  ['dispersion', 'kubejs:energized_fluorite_crystal', 'mekanism:alloy_reinforced', 'draconicevolution:draconium_ingot', 'kubejs:circuit_board_t2'],
  ['gravitomagnetic', 'kubejs:energized_chrysolite_crystal', 'mekanism:alloy_atomic', 'powah:capacitor_niotic', 'kubejs:circuit_board_t2'],
  ['anisotropic', 'kubejs:energized_ametrine_crystal', 'powah:capacitor_spirited', 'draconicevolution:wyvern_core', 'kubejs:circuit_board_t3'],
  ['fluctuation', 'maelstromtech:star_matter', 'mekanism:pellet_polonium', 'draconicevolution:awakened_draconium_ingot', 'kubejs:circuit_board_t3'],
  ['aberration', 'maelstromtech:pulsing_energon_crystal', 'kubejs:quantum_alloy_ingot', 'draconicevolution:awakened_core', 'kubejs:circuit_board_t4'],
  ['parametric', 'maelstromtech:neutron_star', 'avaritia:neutron_ingot', 'mekanism:pellet_antimatter', 'kubejs:circuit_board_t4'],
  ['chronodynamic', 'maelstromtech:liquid_singularity_neutronium', 'kubejs:chaos_alloy_ingot', 'draconicevolution:chaotic_core', 'kubejs:circuit_board_t4'],
  ['antimaterial', 'maelstromtech:star_core', 'avaritia:infinity_ingot', 'maelstromtech:liquid_singularity_draconium', 'draconicevolution:chaotic_energy_core']
]

ServerEvents.recipes(function (event) {
  var prev = 'industrialupgrade:machines/quantum_solar_paneliu'
  WEB3_PANELS.forEach(function (p, i) {
    var out = 'maelstromtech:' + p[0] + '_solar_panel'
    event.shaped(out, ['MXM', 'SPA', 'KMK'], { M: p[2], X: p[1], P: prev, K: p[3], S: 'kubejs:solar_core' + (i + 1), A: 'kubejs:matter_' + WEB3_MATTER[i] })
      .id('kubejs:web_3/panel_' + p[0])
    prev = out
  })
  console.info('[web_3] panels ' + WEB3_PANELS.length + ' recipes')
})

// ---- NIGHT2 боковые лестницы панелей LoliLand (сходятся в искрящуюся панель, ll_progression §3.1).
// Зачем: путь к финалу LL идёт через 6 лестниц панелей; у нас солнечная (выше) + эти 5. Рецепт как у солнечных:
// M X M / P Q P / K C K — P ×2 предыдущая в лестнице (первая — дисперсионная, улучшенные пчёлы — базовая того же цвета),
// Q — солнечная панель того же ранга (лестницы держатся на солнечной, как у LL), X и C — деталь и плата ранга из WEB3_PANELS,
// M/K — тема лестницы: термодинамика Mekanism, сплавы Ender IO/IE, пчёлы Forestry, Draconic+Avaritia, AE2+Ender IO.
// DAY4 (баланс 2–3 ч/день): P — 1 предыдущая (было ×2), Q — ядро солнечной панели ранга (было целая солнечная панель ранга:
// вершина квантового генератора тянула 300+ квантовых ядер): M X M / M P Q / K C K.
var WEB3_LADDERS = [
  // [M, K, [[id, ранг, P (если не предыдущая)]...]]
  ['mekanism:ultimate_thermodynamic_conductor', 'mekanismgenerators:heat_generator', [['purple_spectrum_thermodynamic_panel', 0],
    ['red_spectrum_thermodynamic_panel', 1], ['transparent_thermodynamic_panel', 2], ['turquoise_spectrum_thermodynamic_panel', 3],
    ['ultimate_holographic_thermodynamic_panel', 4]]],
  ['enderio:vibrant_alloy_ingot', 'immersiveengineering:ingot_electrum', [['bronze_electrolyzed_panel', 0], ['glowstone_electrolyzed_panel', 1],
    ['obsidian_electrolyzed_panel', 2], ['osmium_electrolyzed_panel', 3], ['multiallow_ultimate_electrolyzed_panel', 4]]],
  ['forestry:royal_jelly', 'forestry:impregnated_frame', [['beekeeper_blue_panel', 0], ['beekeeper_green_panel', 1], ['beekeeper_purple_panel', 2],
    ['beekeeper_amber_panel', 3], ['improved_beekeeper_blue_panel', 1, 'beekeeper_blue_panel'], ['improved_beekeeper_green_panel', 2, 'beekeeper_green_panel'],
    ['improved_beekeeper_purple_panel', 3, 'beekeeper_purple_panel'], ['improved_beekeeper_amber_panel', 4, 'beekeeper_amber_panel'],
    ['ultimate_four_color_beekeeper_panel', 5, 'improved_beekeeper_amber_panel']]],
  ['draconicevolution:dragon_heart', 'avaritia:crystal_matrix_ingot', [['chaos_guardian_panel', 0], ['cold_guardian_panel', 1], ['flame_guardian_panel', 2],
    ['infinity_guardian_panel', 3], ['infinity_demon_guardian_panel', 4], ['dragon_slayer_ultimate_panel', 5]]],
  ['ae2:quantum_entangled_singularity', 'enderio:ender_crystal', [['panel_nightmares', 0], ['panel_mortum', 1], ['panel_mystery_dungeon', 2],
    ['panel_dream', 3], ['ultimate_dimension_traveler_panel', 4]]]
]

ServerEvents.recipes(function (event) {
  var n = 0
  WEB3_LADDERS.forEach(function (l) {
    var prev = 'maelstromtech:dispersion_solar_panel'
    l[2].forEach(function (e) {
      var r = e[1], p = e[2] ? 'maelstromtech:' + e[2] : prev, id = 'maelstromtech:' + e[0]
      event.shaped(id, ['MXM', 'MPQ', 'KCK'], { M: l[0], X: WEB3_PANELS[r][1], P: p, Q: 'kubejs:solar_core' + (r + 1), K: l[1], C: WEB3_PANELS[r][4] })
        .id('kubejs:web_3/ladder_' + e[0])
      if (!e[2]) prev = id
      n++
    })
  })
  console.info('[web_3] ladder panels ' + n + ' recipes')
})
