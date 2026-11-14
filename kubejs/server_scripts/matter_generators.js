// QUEUE16 шаг 1: рецепты 30 генераторов твёрдой материи (maelstromtech:matter_generator_tN[_x6|_x12]). Зачем: форма и материалы —
// рецепты LoliLand (HiTech_IC2_GenMatter.zs), предметы LL заменены по _ai/loliland/idmap.json. Тир N ← тир N−1 в центре;
// ×6 ← обычный того же тира, ×12 ← ×6 (как в LL). Допущение: IC2 ItemMultiMaterial:47 (нет в idmap) → антиматерия Mekanism.
ServerEvents.recipes(function (e) {
  var M = {
    pt: 'industrialupgrade:itemingots/platinum_ingot', ec: 'mekanism:elite_control_circuit', pc: 'mekanism:ultimate_control_circuit',
    f3: 'industrialforegoing:machine_frame_supreme', f2: 'industrialforegoing:machine_frame_advanced', f9: 'industrialforegoing:machine_frame_supreme',
    cm: 'avaritia:crystal_matrix_ingot', dc: 'draconicevolution:draconium_core', wc: 'draconicevolution:wyvern_core', ac: 'draconicevolution:awakened_core',
    de: 'draconicevolution:draconic_energy_core', fp: 'maelstromtech:plasma_reagent_exothermic', ap: 'maelstromtech:plasma_reagent_quark',
    al: 'kubejs:quantum_alloy_ingot', // T107: был алюмель IU — скрыт, пути нет; квантовый сплав той же ступени
    os: 'mekanism:crystal_osmium', sv: 'immersiveengineering:dust_silver', gd: 'mekanism:crystal_gold',
    tc: 'mekanism:teleportation_core', en: 'industrialupgrade:battery/energy_crystal', mc: 'kubejs:multialloy_allow_capacitor',
    br: 'avaritia:neutron_ingot', tq: 'kubejs:turquoise_spectrum_thermodynamic_core', hc: 'kubejs:holographic_thermodynamic_core',
    am: 'kubejs:ametrine_crystal', rg: 'immersiveengineering:ingot_electrum', mm: 'mekanism:pellet_antimatter'
  }
  // сетки LL построчно, '@' — предыдущий генератор (центр)
  var X1 = [
    ['pt ec pt', 'ec f3 ec', 'pt ec pt'], ['ec cm ec', 'dc @ dc', 'ec cm ec'], ['cm fp dc', 'ec @ ec', 'dc fp cm'], ['cm fp cm', 'dc @ dc', 'cm fp cm'],
    ['fp al dc', 'cm @ cm', 'dc al fp'], ['fp dc cm', 'wc @ wc', 'cm dc fp'], ['cm ec wc', 'fp @ fp', 'wc ec cm'], ['fp cm fp', 'os @ os', 'fp cm fp'],
    ['cm ap dc', 'sv @ sv', 'dc ap cm'], ['cm gd wc', 'pc @ pc', 'wc gd cm']]
  var X6 = [
    ['wc pc wc', 'tc @ tc', 'wc pc wc'], ['wc ec wc', 'en @ en', 'wc ec wc'], ['pc wc pc', 'f2 @ f2', 'pc wc pc'], ['wc tc wc', 'f2 @ f2', 'wc tc wc'],
    ['tc mc tc', 'br @ br', 'wc mc wc'], ['wc pc wc', 'mc @ mc', 'wc pc wc'], ['wc f9 wc', 'tq @ tq', 'wc f9 wc'], ['mc pc wc', 'tc @ tc', 'wc pc mc'],
    ['f9 mc wc', 'f3 @ f3', 'wc mc f9'], ['wc tq de', 'mc @ mc', 'de tq wc']]
  var X12 = [
    ['de am de', 'ac @ ac', 'de am de'], ['rg de ac', 'tc @ tc', 'ac de rg'], ['ac de ac', 'ec @ ec', 'ac de ac'], ['ac rg ac', 'de @ de', 'ac rg ac'],
    ['ac f3 ac', 'pc @ pc', 'ac f3 ac'], ['de mm ac', 'f3 @ f3', 'ac mm de'], ['mm mc ac', 'pc @ pc', 'ac mc mm'], ['ac de ac', 'de @ de', 'ac de ac'],
    ['ac pc ac', 'hc @ hc', 'ac pc ac'], ['ac hc ac', 'mm @ mm', 'ac hc ac']]
  var id = function (t, v) { return 'maelstromtech:matter_generator_t' + (t + 1) + ['', '_x6', '_x12'][v] }
  var n = 0
  ;[X1, X6, X12].forEach(function (grids, v) {
    grids.forEach(function (g, t) {
      var keys = {}, L = 'ABCDEFGH', rows = g.map(function (row) {
        return row.split(' ').map(function (k) {
          if (k == '@') return 'Z'
          if (!(k in keys)) keys[k] = L[Object.keys(keys).length]
          return keys[k]
        }).join('')
      }), key = {}
      Object.keys(keys).forEach(function (k) { key[keys[k]] = M[k] })
      var prev = v == 0 ? (t == 0 ? null : id(t - 1, 0)) : id(t, v - 1)
      if (prev) key.Z = prev // T1 ×1: в центре рама (как в LL)
      e.shaped(id(t, v), rows, key).id('kubejs:matter_generators/' + id(t, v).split(':')[1]); n++
    })
  })
  console.info('[check] matter_generators: ' + n + ' recipes')
})
