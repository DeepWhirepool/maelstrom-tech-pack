// DAY2/QUEUE16: лестница материй LoliLand (генерирует _ai/tools/gen_ll_cores.py). Зачем: материи LL обязательны на пути к финалу
// (входы панелей и искрящегося ядра). Как в LL — Генератор твёрдой материи тира N (рецепт maelstromtech:matter_solid, блоки matter_generator_tN): предыдущая материя + FE.
// Слияние Draconic и дуговая печь (искрящаяся) убраны: генератор покрывает все 9 материй.
ServerEvents.recipes(function (e) {
  e.custom({"type": "maelstromtech:matter_solid", "tier": 1, "ingredient": {"item": "industrialupgrade:solidmatter/matter"}, "count": 1, "result": {"id": "kubejs:matter_loose_pink", "count": 1}, "energy": 800000}).id("kubejs:ll_matter/matter_loose_pink")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 2, "ingredient": {"item": "kubejs:matter_loose_pink"}, "count": 1, "result": {"id": "kubejs:matter_luminous_pink", "count": 1}, "energy": 1200000}).id("kubejs:ll_matter/matter_luminous_pink")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 3, "ingredient": {"item": "kubejs:matter_luminous_pink"}, "count": 2, "result": {"id": "kubejs:matter_mutated_violet_turquoise", "count": 1}, "energy": 2000000}).id("kubejs:ll_matter/matter_mutated_violet_turquoise")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 4, "ingredient": {"item": "kubejs:matter_mutated_violet_turquoise"}, "count": 2, "result": {"id": "kubejs:matter_turquoise", "count": 1}, "energy": 3200000}).id("kubejs:ll_matter/matter_turquoise")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 5, "ingredient": {"item": "kubejs:matter_turquoise"}, "count": 2, "result": {"id": "kubejs:matter_purple", "count": 1}, "energy": 4800000}).id("kubejs:ll_matter/matter_purple")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 6, "ingredient": {"item": "kubejs:matter_purple"}, "count": 2, "result": {"id": "kubejs:matter_luminous_turquoise", "count": 1}, "energy": 6400000}).id("kubejs:ll_matter/matter_luminous_turquoise")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 7, "ingredient": {"item": "kubejs:matter_luminous_turquoise"}, "count": 2, "result": {"id": "kubejs:matter_luminous_red", "count": 1}, "energy": 10000000}).id("kubejs:ll_matter/matter_luminous_red")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 8, "ingredient": {"item": "kubejs:matter_luminous_red"}, "count": 2, "result": {"id": "kubejs:matter_loose_blue", "count": 1}, "energy": 20000000}).id("kubejs:ll_matter/matter_loose_blue")
  e.custom({"type": "maelstromtech:matter_solid", "tier": 9, "ingredient": {"item": "kubejs:matter_loose_blue"}, "count": 4, "result": {"id": "kubejs:matter_sparkling", "count": 1}, "energy": 40000000}).id("kubejs:ll_matter/matter_sparkling")
  console.info('[ll_matter] 9 recipes')
})
