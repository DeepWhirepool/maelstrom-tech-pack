// T15: материалы-«клей» для паутины рецептов (только регистрация, рецепты отдельно)
const GEMS = ['ametrine', 'fluorite', 'chrysolite'] // тиры: флюорит < хризолит < аметрин
StartupEvents.registry('item', e => {
  GEMS.forEach(g => {
    e.create(`${g}_crystal`)
    e.create(`energized_${g}_crystal`).rarity('uncommon').component('minecraft:enchantment_glint_override', true)
    e.create(`${g}_dust`)
  })
  e.create('quantum_alloy_ingot').rarity('rare')
  e.create('chaos_alloy_ingot').rarity('epic')
  for (let t = 1; t <= 4; t++) e.create(`circuit_board_t${t}`)
})
