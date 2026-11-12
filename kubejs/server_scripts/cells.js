// T77: капсулы IU (жидкостные) снова в игре — дешёвый оловянный крафт (в LoliLand своего нет: там IC2 по умолчанию).
// Стак 64 (усиленная — миксин maelstromtech), заполненные одной жидкостью стакаются. Родные рецепты IU убраны, чтобы не было дублей.
ServerEvents.recipes(function (event) {
  var U = function (s) { return 'industrialupgrade:' + s }
  ;['industrialupgrade_1667', 'industrialupgrade_2427', 'industrialupgrade_2428'].forEach(function (id) { event.remove({ id: U(id) }) })
  event.shaped(Item.of(U('itemcell/itemcell'), 4), [' T ', 'TGT', ' T '], { T: '#c:plates/tin', G: '#c:glass_panes' }).id('kubejs:cells/universal')
  event.shaped(Item.of(U('itemcell/smallfluidcell'), 8), [' T ', 'T T', ' T '], { T: '#c:plates/tin' }).id('kubejs:cells/small')
  // усиленная (10 B) — апгрейд универсальной бронзой
  event.shaped(U('itemcell/reinforcedfluidcell'), [' B ', 'BCB', ' B '], { B: '#c:plates/bronze', C: U('itemcell/itemcell') }).id('kubejs:cells/reinforced')
  console.info('[check] cells: 3 recipes')
})
