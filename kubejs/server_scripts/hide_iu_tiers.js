// T74 тиры машин IU: убираем рецепты двойных/тройных/четверных/фотонных машин переработки, которые прячем в JEI
// (client_scripts/hide_iu_tiers.js). Зачем: оставляем базовую машину каждого семейства (как в IC2), скорость/параллель
// закрывают фабрики Mekanism и апгрейды. Тиры из web_*/ll_*/goals.txt и их цепочки не трогаем. Таблица: _ai/iu_machine_tiers.md.
var HIDE_IU_TIERS = [
  'industrialupgrade:adv_refiner/adv_refiner', 'industrialupgrade:basemachine3/double_handlerho', 'industrialupgrade:basemachine3/dual_multi_crop',
  'industrialupgrade:basemachine3/imp_refiner', 'industrialupgrade:basemachine3/per_alloy_smelter', 'industrialupgrade:basemachine3/quad_handlerho',
  'industrialupgrade:basemachine3/quad_multi_crop', 'industrialupgrade:basemachine3/triple_handlerho', 'industrialupgrade:basemachine3/triple_multi_crop',
  'industrialupgrade:basemachine3/triple_solid_mixer', 'industrialupgrade:moremachine/double_commpressor', 'industrialupgrade:moremachine/double_extractor',
  'industrialupgrade:moremachine/double_furnace', 'industrialupgrade:moremachine/double_macerator', 'industrialupgrade:moremachine1/quad_comb_recycler',
  'industrialupgrade:moremachine1/triple_comb_recycler', 'industrialupgrade:moremachine2/double_extruder', 'industrialupgrade:moremachine2/quad_extruder',
  'industrialupgrade:moremachine2/quad_rolling', 'industrialupgrade:moremachine2/triple_extruder', 'industrialupgrade:moremachine2/triple_rolling',
  'industrialupgrade:moremachine3/double_assamplerscrap', 'industrialupgrade:moremachine3/double_farmer', 'industrialupgrade:moremachine3/doublegearing',
  'industrialupgrade:moremachine3/quad_assamplerscrap', 'industrialupgrade:moremachine3/quad_farmer', 'industrialupgrade:moremachine3/quadgearing',
  'industrialupgrade:moremachine3/triple_assamplerscrap', 'industrialupgrade:moremachine3/triple_farmer', 'industrialupgrade:moremachine3/triplegearing',
  'industrialupgrade:photonic_machine/photonic_assembler', 'industrialupgrade:photonic_machine/photonic_comb_mac', 'industrialupgrade:photonic_machine/photonic_comb_recycler',
  'industrialupgrade:photonic_machine/photonic_compressor', 'industrialupgrade:photonic_machine/photonic_cutting', 'industrialupgrade:photonic_machine/photonic_extractor',
  'industrialupgrade:photonic_machine/photonic_extruding', 'industrialupgrade:photonic_machine/photonic_fermer', 'industrialupgrade:photonic_machine/photonic_furnace',
  'industrialupgrade:photonic_machine/photonic_gearing', 'industrialupgrade:photonic_machine/photonic_handlerho', 'industrialupgrade:photonic_machine/photonic_macerator',
  'industrialupgrade:photonic_machine/photonic_rolling'
]

function hideIuTierOuts(el, acc) {
  if (el == null || el.isJsonNull()) return
  if (el.isJsonPrimitive()) acc.push(String(el.getAsString()))
  else if (el.isJsonArray()) { for (var i = 0; i < el.size(); i++) hideIuTierOuts(el.get(i), acc) }
  else if (el.isJsonObject()) { var it = el.keySet().iterator(); while (it.hasNext()) hideIuTierOuts(el.get(it.next()), acc) }
}

ServerEvents.recipes(function (event) {
  var set = {}
  HIDE_IU_TIERS.forEach(function (id) { set[id] = true })
  var ids = []
  event.forEachRecipe({}, function (r) {
    try {
      var json = r.json, outs = []
      ;['result', 'results', 'output', 'outputs'].forEach(function (k) { if (json.has(k)) hideIuTierOuts(json.get(k), outs) })
      for (var i = 0; i < outs.length; i++) if (set[outs[i]]) { ids.push(String(r.getId())); return }
    } catch (e) {}
  })
  ids.forEach(function (id) { event.remove({ id: id }) })
  console.info('[hide_iu_tiers] items: ' + HIDE_IU_TIERS.length + ', recipes removed: ' + ids.length)
})
