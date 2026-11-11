// Ступени для предметов не-энергетических модов (как P3 power_gates: одна ячейка рецепта -> гейт ступени).
// ironchest: crystal/obsidian = S2 (гейт infused alloy). Рецепт пересоздаётся с тем же id: верхняя середина -> G2.
// Trapped-варианты делаются из этих сундуков (shapeless) и заперты через них.
var SG2 = 'mekanism:alloy_infused'
var IRONCHEST_S2 = [
  // [id рецепта, выход, шаблон, ключи] — шаблоны из jar ironchest 16.0.7, буква A = гейт
  ['ironchest:diamond_crystal_chest', 'ironchest:crystal_chest', ['GAG', 'GSG', 'GGG'], { G: '#c:glass_blocks', S: 'ironchest:diamond_chest' }],
  ['ironchest:diamond_obsidian_chest', 'ironchest:obsidian_chest', ['MAM', 'MSM', 'MMM'], { M: 'minecraft:obsidian', S: 'ironchest:diamond_chest' }],
  ['ironchest:diamond_to_crystal_chest_upgrade', 'ironchest:diamond_to_crystal_chest_upgrade', ['GAG', 'GMG', 'GGG'], { G: '#c:glass_blocks', M: 'minecraft:obsidian' }],
  ['ironchest:diamond_to_obsidian_chest_upgrade', 'ironchest:diamond_to_obsidian_chest_upgrade', ['MAM', 'MGM', 'MMM'], { G: '#c:glass_blocks', M: 'minecraft:obsidian' }]
]

ServerEvents.recipes(function (event) {
  IRONCHEST_S2.forEach(function (r) {
    event.remove({ id: r[0] })
    var key = { A: SG2 }
    for (var k in r[3]) key[k] = r[3][k]
    event.shaped(r[1], r[2], key).id(r[0])
  })
  console.info('[check] stage_gates: ' + IRONCHEST_S2.length + ' recipes')
})
