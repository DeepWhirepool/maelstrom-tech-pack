// T100: изолента — прикрепить любой джетпак (тег maelstromtech:jetpacks) к любому нагруднику, как в IC2
ServerEvents.recipes(event => {
  // ранний этап: резина IU + бумага + нить -> 2 изоленты (дёшево, чтобы джетпак носился вместе с бронёй с самого начала)
  event.shapeless('2x maelstromtech:duct_tape', ['industrialupgrade:crafting_elements/crafting_271_element', 'minecraft:paper', 'minecraft:string']).id('kubejs:duct_tape')
  // нагрудник + джетпак + изолента -> нагрудник со встроенным джетпаком (особый рецепт мода, проверяет предметы сам)
  event.custom({ type: 'maelstromtech:attach_jetpack', category: 'equipment' }).id('kubejs:attach_jetpack')
  // нагрудник со встроенным джетпаком + ножницы -> нагрудник, джетпак остаётся в сетке (изолента пропадает)
  event.custom({ type: 'maelstromtech:detach_jetpack', category: 'equipment' }).id('kubejs:detach_jetpack')
})
