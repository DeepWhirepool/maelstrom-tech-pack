// T44: граф рецептов для проверки проходимости (_ai/tools/reach.py). Рецепты не меняет. zz_ — чтобы выполняться последним.
var GRAPH_OUT = /result|output|product|secondar|byproduct|slag/i
function graphWalk(e, out, list) {
  if (e.isJsonArray()) { e.forEach(function (x) { graphWalk(x, out, list) }); return }
  if (!e.isJsonObject()) return
  e.entrySet().forEach(function (en) {
    var k = String(en.getKey()), v = en.getValue(), o = out || GRAPH_OUT.test(k)
    if (v.isJsonPrimitive() && v.getAsJsonPrimitive().isString()) {
      var s = String(v.getAsString())
      if (k == 'item' || k == 'id') list[o ? 1 : 0].push(s)
      else if (k == 'fluid' || k == 'chemical' || k == 'gas') list[o ? 1 : 0].push('fluid:' + s)
      else if (k == 'tag' && !o) { // тег = один слот «любой из»: вход-массив
        var ids = Ingredient.of('#' + s).itemIds.map(function (i) { return String(i) })
        list[0].push(ids.length ? ids : 'fluid:' + s)
      }
    } else graphWalk(v, o, list)
  })
}
ServerEvents.loaded(function (event) { // в ServerEvents.recipes не видно рецептов KubeJS — берём загруженные из RecipeManager
  var RECIPE = Java.loadClass('net.minecraft.world.item.crafting.Recipe'), JsonOps = Java.loadClass('com.mojang.serialization.JsonOps')
  var ops = event.server.registryAccess().createSerializationContext(JsonOps.INSTANCE), g = [], failed = 0, bad = []
  event.server.getRecipeManager().getRecipes().forEach(function (h) {
    try {
      var j = RECIPE.CODEC.encodeStart(ops, h.value()).getOrThrow(), l = [[], []]
      graphWalk(j, false, l)
      g.push({ id: String(h.id()), type: String(j.get('type').getAsString()), 'in': l[0], out: l[1] })
    } catch (e) { failed++ }
  })
  // машины IU держат рецепты в своём реестре (com.denfop.api.Recipes), а не в RecipeManager
  var IU = Java.loadClass('com.denfop.api.Recipes').recipes, FL = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').FLUID
  var fl = function (f) { return 'fluid:' + FL.getKey(f.getFluid()) }
  var its = function (l) { var a = []; l.forEach(function (s) { a.push(String(s.id)) }); return a }
  var add = function (m, i, o) { g.push({ id: 'industrialupgrade:machine/' + m, type: 'industrialupgrade:' + m, 'in': i, out: o }) }
  IU.getMap_recipe_managers().forEach(function (m) {
    try { IU.getRecipeList(m).forEach(function (r) {
      var i = []; r.input.getInputs().forEach(function (x) { i.push(its(x.getInputs())) })
      if (r.input.hasFluids()) try { r.input.getFluidInputs().forEach(function (f) { i.push(fl(f)) }) } catch (e) { i.push(fl(r.input.getFluid())) }
      add(m, i, its(r.output.items))
    }) } catch (e) { failed++; bad.push(m) }
  })
  var F = IU.getRecipeFluid()
  F.getRecipes().forEach(function (m) {
    try { F.getRecipeList(m).forEach(function (r) {
      var i = [], o = []
      r.input.getInputs().forEach(function (f) { i.push(fl(f)) }); r.output_fluid.forEach(function (f) { o.push(fl(f)) })
      try { i.push(its(r.input.getStack().getInputs())) } catch (e) {} // жидкостный рецепт может быть без предмета
      add(m, i, o)
    }) } catch (e) { failed++; bad.push(m) }
  })
  JsonIO.write('local/kubejs/graph.json', { recipes: g })
  console.info('[_dump_graph] ' + g.length + ' recipes, failed ' + failed + (bad.length ? ' (IU: ' + bad.join(' ') + ')' : ''))
})
