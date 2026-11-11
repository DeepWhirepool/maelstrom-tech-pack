// T74 тиры машин IU: прячем в JEI высшие тиры машин переработки (базовая машина семейства остаётся). Таблица: _ai/iu_machine_tiers.md.
// Рецепты этих предметов убирает server_scripts/hide_iu_tiers.js.
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
HIDE_IU_TIERS = HIDE_IU_TIERS.concat([ // T75: панели IU выше квантовой — их место заняли панели Maelstrom Tech (тиры LoliLand)
  'industrialupgrade:machines/spectral_solar_panel', 'industrialupgrade:machines/proton_solar_panel', 'industrialupgrade:machines/singular_solar_panel',
  'industrialupgrade:machines/admin_solar_panel', 'industrialupgrade:machines/photonic_solar_panel', 'industrialupgrade:machines/neutronium_solar_panel',
  'industrialupgrade:machines/barion_solar_panel', 'industrialupgrade:machines/hadron_solar_panel', 'industrialupgrade:machines/graviton_solar_panel',
  'industrialupgrade:machines/quark_solar_panel'
])

RecipeViewerEvents.removeEntries('item', function (event) {
  var ok = 0
  HIDE_IU_TIERS.forEach(function (id) {
    try { event.remove(id); ok++ } catch (e) { console.error('[hide_iu_tiers] not hidden ' + id + ': ' + e) }
  })
  console.info('[hide_iu_tiers] JEI items hidden: ' + ok + '/' + HIDE_IU_TIERS.length)
})
