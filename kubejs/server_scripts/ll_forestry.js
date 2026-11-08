// T58/T59: сетки верстака LoliLand HiTech (1.7.10) -> наша сборка. Файл генерирует _ai/tools/ll_conv.py (forestry), руками не править.
// Зачем: перенос идеи крафтов LoliLand (какие детали каких модов сходятся); id переведены по _ai/loliland/idmap.json.
// Старые рецепты верстака для этих результатов удаляются: рецепт LoliLand заменяет наш/модовый.
ServerEvents.recipes(function (e) {
  var n = 0
  ;["forestry:alveary_block", "forestry:proven_frame", "forestry:refined_circuit_board"].forEach(function (t) { ["minecraft:crafting_shaped", "minecraft:crafting_shapeless", "industrialupgrade:shaped_recipe", "industrialupgrade:shapeless_recipe"].forEach(function (ty) { e.remove({ output: t, type: ty }) }) })
  // forestry:proven_frame <- Forestry:frameProven (HiTech_Forestry.zs)
  e.custom({"type": "minecraft:crafting_shaped", "category": "misc", "pattern": ["AAA", "BCB", "AAA"], "key": {"A": {"item": "forestry:scented_paneling"}, "B": {"item": "forestry:beeswax"}, "C": {"item": "forestry:dissipation_charge"}}, "result": {"count": 1, "id": "forestry:proven_frame"}}).id("kubejs:ll_forestry/proven_frame"); n++
  // forestry:alveary_block <- Forestry:alveary (HiTech_Forestry.zs)
  e.custom({"type": "minecraft:crafting_shaped", "category": "misc", "pattern": ["AAA", "ABA", "AAA"], "key": {"A": {"item": "forestry:scented_paneling"}, "B": {"item": "forestry:impregnated_casing"}}, "result": {"count": 1, "id": "forestry:alveary_block"}}).id("kubejs:ll_forestry/alveary_block"); n++
  // forestry:refined_circuit_board <- Forestry:chipsets:2 (HiTech_GenDustry.zs)
  e.custom({"type": "minecraft:crafting_shaped", "category": "misc", "pattern": ["ABA", "ABA", "ABA"], "key": {"A": {"item": "minecraft:iron_ingot"}, "B": {"item": "minecraft:redstone"}}, "result": {"count": 1, "id": "forestry:refined_circuit_board"}}).id("kubejs:ll_forestry/refined_circuit_board"); n++
  console.info('[ll_forestry] ' + n + ' recipes')
})
