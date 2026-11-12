// T77: металлические краники Maelstrom Tech (прочнее деревянного IU: ×8/×6/×4/×25/×60). Форма — как у деревянного (ic2_recipes.js),
// материал свой; незеритовый — как ванильный незерит: алмазный + шаблон + слиток в столе кузнеца.
ServerEvents.recipes(function (event) {
  ;[['iron', '#c:ingots/iron'], ['copper', '#c:ingots/copper'], ['gold', '#c:ingots/gold'], ['diamond', '#c:gems/diamond']].forEach(function (m) {
    event.shaped('maelstromtech:' + m[0] + '_treetap', [' P ', 'PPP', 'P  '], { P: m[1] }).id('kubejs:treetap/' + m[0])
  })
  event.smithing('maelstromtech:netherite_treetap', 'minecraft:netherite_upgrade_smithing_template', 'maelstromtech:diamond_treetap', '#c:ingots/netherite')
    .id('kubejs:treetap/netherite')
  console.info('[check] treetaps: 5 recipes')
})
