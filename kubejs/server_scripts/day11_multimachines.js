// DAY11: LL idea: base IU + niobium/modules/board; x12 uses one x6 and next-tier parts.
// Mekanism alloys/circuits and IF/IE parts weave the branches without doubling previous tiers.
ServerEvents.recipes(e => {
  // macerator: same family base; two mod branches already at x6.
  e.shaped('maelstromtech:macerator_x6', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'industrialupgrade:simplemachine/macerator_iu', C:'industrialupgrade:upgrademodules/upgrademodule', D:'industrialupgrade:blockresource/advanced_machine', E:'mekanism:alloy_reinforced', F:'kubejs:circuit_board_t1'}).id('kubejs:day11/macerator_x6')
  // Next generation: one preceding machine, frame/niobium/board and higher-tier circuits.
  e.shaped('maelstromtech:macerator_x12', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'kubejs:circuit_board_t2', C:'mekanism:ultimate_control_circuit', D:'maelstromtech:macerator_x6', E:'immersiveengineering:ingot_electrum', F:'industrialforegoing:machine_frame_advanced'}).id('kubejs:day11/macerator_x12')
  // furnace: same family base; two mod branches already at x6.
  e.shaped('maelstromtech:furnace_x6', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'industrialupgrade:simplemachine/furnace_iu', C:'industrialupgrade:upgrademodules/upgrademodule', D:'industrialupgrade:blockresource/advanced_machine', E:'mekanism:alloy_reinforced', F:'kubejs:circuit_board_t1'}).id('kubejs:day11/furnace_x6')
  // Next generation: one preceding machine, frame/niobium/board and higher-tier circuits.
  e.shaped('maelstromtech:furnace_x12', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'kubejs:circuit_board_t2', C:'mekanism:ultimate_control_circuit', D:'maelstromtech:furnace_x6', E:'immersiveengineering:ingot_electrum', F:'industrialforegoing:machine_frame_advanced'}).id('kubejs:day11/furnace_x12')
  // compressor: same family base; two mod branches already at x6.
  e.shaped('maelstromtech:compressor_x6', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'industrialupgrade:simplemachine/compressor_iu', C:'industrialupgrade:upgrademodules/upgrademodule', D:'industrialupgrade:blockresource/advanced_machine', E:'mekanism:alloy_reinforced', F:'kubejs:circuit_board_t1'}).id('kubejs:day11/compressor_x6')
  // Next generation: one preceding machine, frame/niobium/board and higher-tier circuits.
  e.shaped('maelstromtech:compressor_x12', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'kubejs:circuit_board_t2', C:'mekanism:ultimate_control_circuit', D:'maelstromtech:compressor_x6', E:'immersiveengineering:ingot_electrum', F:'industrialforegoing:machine_frame_advanced'}).id('kubejs:day11/compressor_x12')
  // extractor: same family base; two mod branches already at x6.
  e.shaped('maelstromtech:extractor_x6', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'industrialupgrade:simplemachine/extractor_iu', C:'industrialupgrade:upgrademodules/upgrademodule', D:'industrialupgrade:blockresource/advanced_machine', E:'mekanism:alloy_reinforced', F:'kubejs:circuit_board_t1'}).id('kubejs:day11/extractor_x6')
  // Next generation: one preceding machine, frame/niobium/board and higher-tier circuits.
  e.shaped('maelstromtech:extractor_x12', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'kubejs:circuit_board_t2', C:'mekanism:ultimate_control_circuit', D:'maelstromtech:extractor_x6', E:'immersiveengineering:ingot_electrum', F:'industrialforegoing:machine_frame_advanced'}).id('kubejs:day11/extractor_x12')
  // metal_former: same family base; two mod branches already at x6.
  e.shaped('maelstromtech:metal_former_x6', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'industrialupgrade:basemachine3/rolling_machine', C:'industrialupgrade:upgrademodules/upgrademodule', D:'industrialupgrade:blockresource/advanced_machine', E:'mekanism:alloy_reinforced', F:'kubejs:circuit_board_t1'}).id('kubejs:day11/metal_former_x6')
  // Next generation: one preceding machine, frame/niobium/board and higher-tier circuits.
  e.shaped('maelstromtech:metal_former_x12', ['ABA','CDC','EFE'], {A:'industrialupgrade:itemingots/niobium', B:'kubejs:circuit_board_t2', C:'mekanism:ultimate_control_circuit', D:'maelstromtech:metal_former_x6', E:'immersiveengineering:ingot_electrum', F:'industrialforegoing:machine_frame_advanced'}).id('kubejs:day11/metal_former_x12')
  console.info('[day11] 10 multi-machine recipes')
})

// IU doublemolecular is outside RecipeManager: replace only its old machine ingredient via the public API.
ServerEvents.loaded(event => {
  var api = Java.loadClass('com.denfop.api.Recipes'), IU = api.recipes, changed = 0
  IU.getRecipeList('doublemolecular').forEach(r => {
    var inputs = r.input.getInputs()
    for (var i = 0; i < inputs.size(); i++) {
      var ingredient = inputs.get(i)
      if (ingredient.getInputs().size() == 1 && String(ingredient.getInputs().getFirst().id) == 'industrialupgrade:moremachine/quad_macerator') {
        inputs.set(i, api.inputFactory.getInput(Item.of('maelstromtech:macerator_x12'), ingredient.getAmount())); changed++
      }
    }
  })
  if (changed) IU.optimize()
  console.info('[day11] molecular machine inputs replaced: ' + changed)
})
