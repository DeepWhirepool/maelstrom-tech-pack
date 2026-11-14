// T107: у Плавильни-кристаллизатора Maelstrom в моде рецепт плавки только для железа, а расплавы золота, меди, серебра,
// алюминия и ниобия (и сингулярности из них) видны в JEI — получить их было нельзя. Слиток → 144 мБ, как у железа.
ServerEvents.recipes(function (event) {
  var n = 0
  ;['gold', 'copper', 'silver', 'aluminum', 'niobium'].forEach(function (m) {
    event.custom({ type: 'maelstromtech:smelting', ingredient: { tag: 'c:ingots/' + m },
      result: { id: 'maelstromtech:molten_' + m, amount: 144 }, energy: 20000 }).id('kubejs:t107/smelt_' + m)
    n++
  })
  console.info('[check] maelstrom_smelting: ' + n + ' recipes')
})
