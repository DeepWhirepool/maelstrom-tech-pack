// T107: у проверенной рамки Forestry нет рецепта (в Forestry её продаёт пасечник-житель) — квест «Проверенные рамки» стоял.
// Плотник: пропитанная рамка + маточное молочко + воск + 250 мБ мёда → проверенная рамка.
ServerEvents.recipes(function (event) {
  event.custom({ type: 'forestry:carpenter', id: 'kubejs:t107/proven_frame', box: [], liquid: { amount: 250, id: 'forestry:honey' }, time: 20,
    recipe: { category: 'misc', key: { F: { item: 'forestry:impregnated_frame' }, J: { item: 'forestry:royal_jelly' }, W: { item: 'forestry:beeswax' } },
      pattern: ['WJW', 'JFJ', 'WJW'], result: { count: 1, id: 'forestry:proven_frame' } } }).id('kubejs:t107/proven_frame')
  console.info('[check] forestry_frames: 1 recipe')
})
