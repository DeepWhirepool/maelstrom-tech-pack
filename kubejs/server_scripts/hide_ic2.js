// hide_ic2: из IU остаются только видимые (_ai/ic2_keep.txt + _ai/iu_except.txt), остальное IU скрыто.
// Массив генерирует _ai/tools/gen_hide_ic2.py — вручную не править. JEI: client_scripts/hide_ic2.js.
var HIDE_IC2_VISIBLE = [
  'alloyingot/nichrome',
  'alloyingot/red_brass',
  'alloyingot/stainless_steel',
  'armour/advanced_batpack',
  'armour/batpack',
  'armour/jetpack',
  'armour/lappack',
  'armour/nano_boots',
  'armour/nano_chestplate',
  'armour/nano_helmet',
  'armour/nano_leggings',
  'armour/nightvision_goggles',
  'armour/quantum_boots',
  'armour/quantum_chestplate',
  'armour/quantum_helmet',
  'armour/quantum_leggings',
  'basemachine/adv_matter',
  'basemachine/imp_matter',
  'basemachine/per_matter',
  'basemachine3/canner_iu',
  'basemachine3/generator_iu',
  'basemachine3/geogenerator_iu',
  'basemachine3/rolling_machine',
  'basemachine3/simple_water_generator',
  'basemachine3/simple_wind_generator',
  'basemachine3/solar_iu',
  'baseore/iridium',
  'baseore1/beryllium',
  'baseore1/bor',
  'baseore1/calcium',
  'baseore1/lithium',
  'battery/advanced_re_battery',
  'battery/energy_crystal',
  'battery/lapotron_crystal',
  'battery/re_battery',
  'blockradiationore/americium_ore',
  'blockradiationore/curium_ore',
  'blockradiationore/neptunium_ore',
  'blockresource/advanced_machine',
  'blockresource/machine',
  'blockspace/deimos_orichalcum_ore',
  'blockspace2/mars_adamantium_ore',
  'blockspace3/mercury_mithril_ore',
  'blockspace3/mimas_bloodstone',
  'bucket/uu_matter',
  'casing/bronze',
  'casing/copper',
  'casing/gold',
  'casing/iron',
  'casing/lead',
  'casing/tin',
  'circuit/advanced_part1',
  'circuit/circuit_part1',
  'compresscarbonultra',
  'cooling_mixture',
  'crafting_elements/crafting_271_element',
  'crafting_elements/crafting_272_element',
  'crafting_elements/crafting_273_element',
  'crafting_elements/crafting_274_element',
  'crafting_elements/crafting_276_element',
  'crafting_elements/crafting_280_element',
  'crafting_elements/crafting_281_element',
  'crafting_elements/crafting_282_element',
  'crafting_elements/crafting_283_element',
  'crafting_elements/crafting_285_element',
  'crafting_elements/crafting_286_element',
  'crafting_elements/crafting_287_element',
  'crafting_elements/crafting_288_element',
  'crafting_elements/crafting_290_element',
  'crafting_elements/crafting_291_element',
  'crafting_elements/crafting_294_element',
  'crafting_elements/crafting_297_element',
  'crafting_elements/crafting_483_element',
  'crafting_elements/crafting_484_element',
  'cryogenic_cooling_mixture',
  'cutter',
  'energy/wrench',
  'energy_tools/chainsaw',
  'energy_tools/diamond_drill',
  'energy_tools/drill',
  'energy_tools/nano_saber',
  'forge_hammer',
  'gear/invar',
  'glass/reinforced',
  'itemcore/quacore',
  'itemdoubleplates/bronze_doubleplate',
  'itemdoubleplates/copper_doubleplate',
  'itemdoubleplates/gold_doubleplate',
  'itemdoubleplates/iron_doubleplate',
  'itemdoubleplates/lead_doubleplate',
  'itemdoubleplates/obsidian_doubleplate',
  'itemdoubleplates/steel_doubleplate',
  'itemdoubleplates/tin_doubleplate',
  'itemdust/ammonium_chloride_dust',
  'itemdust/calcium_dust_dust',
  'itemdust/chromium_dust',
  'itemdust/coal_dust',
  'itemdust/energium_dust',
  'itemdust/germanium_dust',
  'itemdust/iridium_dust',
  'itemdust/lapis_dust',
  'itemdust/magnesium_dust',
  'itemdust/manganese_dust',
  'itemdust/spinel_dust',
  'itemdust/sulfur_dust',
  'itemdust/vanadium_dust',
  'itemdust/zinc_dust',
  'itemingots/alloy_ingot',
  'itemingots/chromium_ingot',
  'itemingots/germanium_ingot',
  'itemingots/invar_ingot',
  'itemingots/iridium_ingot',
  'itemingots/magnesium_ingot',
  'itemingots/manganese_ingot',
  'itemingots/mithril',
  'itemingots/niobium',
  'itemingots/spinel_ingot',
  'itemingots/vanadium_ingot',
  'itemingots/zinc_ingot',
  'itemplates/bronze_plate',
  'itemplates/copper_plate',
  'itemplates/gold_plate',
  'itemplates/iron_plate',
  'itemplates/lapis_plate',
  'itemplates/lead_plate',
  'itemplates/niobium',
  'itemplates/tin_plate',
  'itemsunnarium/sunnarium2',
  'itemsunnarium/sunnarium_enriched',
  'itemsunnarium/sunnarium_plate',
  'itemsunnarium/sunnariumpart',
  'machines/advanced_solar_paneliu',
  'machines/hybrid_solar_paneliu',
  'machines/quantum_solar_paneliu',
  'machines/ultimate_solar_paneliu',
  'moremachine2/rolling',
  'moremachine3/assamplerscrap',
  'moremachine3/centrifuge_iu',
  'moremachine3/orewashing',
  'quantumitems2',
  'quantumitems4',
  'raw_latex',
  'raw_metals/raw_arsenic',
  'raw_metals/raw_barium',
  'raw_metals/raw_bismuth',
  'raw_metals/raw_cadmium',
  'raw_metals/raw_chromium',
  'raw_metals/raw_gadolinium',
  'raw_metals/raw_gallium',
  'raw_metals/raw_germanium',
  'raw_metals/raw_hafnium',
  'raw_metals/raw_magnesium',
  'raw_metals/raw_manganese',
  'raw_metals/raw_molybdenum',
  'raw_metals/raw_neodymium',
  'raw_metals/raw_niobium',
  'raw_metals/raw_palladium',
  'raw_metals/raw_polonium',
  'raw_metals/raw_spinel',
  'raw_metals/raw_strontium',
  'raw_metals/raw_tantalum',
  'raw_metals/raw_thallium',
  'raw_metals/raw_vanadium',
  'raw_metals/raw_yttrium',
  'raw_metals/raw_zinc',
  'raw_metals/raw_zirconium',
  'raw_saltpeter/raw_saltpeter',
  'rotor/rotor_iron',
  'rotor/rotor_wood',
  'rubber_wood/plain_y',
  'sapling/rubber_sapling',
  'simplemachine/compressor_iu',
  'simplemachine/extractor_iu',
  'simplemachine/furnace_iu',
  'simplemachine/generator_matter',
  'simplemachine/macerator_iu',
  'simplemachine/recycler_iu',
  'solidmatter/matter',
  'swamp_rubber_wood/plain_y',
  'thorium_ore/thorium_ore',
  'tools/treetap',
  'transformer_iu/ev',
  'transformer_iu/hv',
  'transformer_iu/lv',
  'transformer_iu/mv',
  'tropical_rubber_wood/plain_y',
  'upgrademodules/upgrademodule',
  'upgrades/energy_storage',
  'upgrades/overclocker',
  'upgrades/transformer',
  'wiring/copper',
  'wiring/copper1',
  'wiring/glass_1',
  'wiring/gold',
  'wiring/gold1',
  'wiring/iron',
  'wiring/iron1',
  'wiring/tin',
  'wiring/tin1',
  'wiring_storage/batbox_iu',
  'wiring_storage/cesu_iu',
  'wiring_storage/mfe_iu',
  'wiring_storage/mfsu_iu',
]
var HIDE_IC2_VIS = {}
HIDE_IC2_VISIBLE.forEach(function (id) { HIDE_IC2_VIS['industrialupgrade:' + id] = true })
function hideIc2(id) { id = String(id); return id.indexOf('industrialupgrade:') == 0 && !HIDE_IC2_VIS[id] }
var HIDE_IC2_TYPES = ['minecraft:crafting_shaped', 'minecraft:crafting_shapeless', 'minecraft:smelting', 'minecraft:blasting',
  'industrialupgrade:shaped_recipe', 'industrialupgrade:shapeless_recipe', 'kubejs:shaped', 'kubejs:shapeless']
var hideIc2Crafting = 0

// верстак/печь: выход скрываемый
ServerEvents.recipes(function (event) {
  var ids = []
  event.forEachRecipe({}, function (r) {
    try {
      var j = r.json, res = j.get('result')
      if (HIDE_IC2_TYPES.indexOf(String(j.get('type').getAsString())) < 0 || !res) return
      if (hideIc2(res.isJsonObject() ? (res.getAsJsonObject().has('id') ? res.get('id') : res.get('item')).getAsString() : res.getAsString())) ids.push(String(r.getId()))
    } catch (e) {}
  })
  ids.forEach(function (id) { event.remove({ id: id }) })
  hideIc2Crafting = ids.length
})

// машины IU (свой реестр com.denfop.api.Recipes): выход целиком скрываемый или есть вход только из скрываемых IU
function hideIc2Machines(tag) {
  var R = Java.loadClass('com.denfop.api.Recipes').recipes, n = 0
  var all = function (l) { var a = []; l.forEach(function (s) { if (s) a.push(String(s.id)) }) /* smeltery: null в выходе */; return a.length > 0 && a.every(hideIc2) }
  R.getMap_recipe_managers().forEach(function (m) {
    try {
      var list = R.getRecipeList(m), idx = R.getMap_recipe_managers_itemStack(m), del = []
      list.forEach(function (r) {
        var bad = all(r.output.items)
        if (!bad) r.input.getInputs().forEach(function (x) { if (all(x.getInputs())) bad = true })
        if (bad) del.push(r)
      })
      del.forEach(function (r) { // как Recipes.removeRecipe, но точно этот рецепт (removeRecipe берёт первый с тем же выходом)
        list['remove(java.lang.Object)'](r)
        if (idx) r.input.getInputs().forEach(function (x) { // индекс входов: убрать запись этого входа (new RecipeInputStack неоднозначен для Rhino)
          for (var i = 0; i < idx.size(); i++) if (idx.get(i).getInput() == x) { idx['remove(int)'](i); break }
        })
      })
      n += del.length
    } catch (e) { console.error('[hide_ic2] manager ' + m + ': ' + e) }
  })
  console.info('[hide_ic2] ' + (tag || '') + 'removed crafting ' + hideIc2Crafting + ', machine ' + n)
}
ServerEvents.loaded(function () { hideIc2Machines() })
// /reload не шлёт loaded, а IU возвращает часть рецептов: на первом тике снимаем снова; повторный проход должен дать machine 0
if (Java.loadClass('net.neoforged.neoforge.server.ServerLifecycleHooks').getCurrentServer()) { var hideIc2Once = true; ServerEvents.tick(function () { if (hideIc2Once) { hideIc2Once = false; hideIc2Machines('reload: '); hideIc2Machines('reload recheck: ') } }) }
