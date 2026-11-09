// DAY11: headless integration check, enabled only by an explicit local flag.
ServerEvents.loaded(event => {
  if (!JsonIO.read('local/check_multimachine.json')) return
  var IU = Java.loadClass('com.denfop.api.Recipes').recipes
  var MT = Java.loadClass('ru.maelstromtech.MaelstromTech')
  var Machine = Java.loadClass('ru.maelstromtech.machine.MultiMachineBlockEntity')
  var Pos = Java.loadClass('net.minecraft.core.BlockPos')
  var Stack = Java.loadClass('net.minecraft.world.item.ItemStack')
  var results = [], unsupported = 0, failed = 0
  ;['macerator','compressor','extractor','rolling','extruding','cutting'].forEach((name, index) => {
    var recipes = IU.getRecipeList(name), bad = 0, sample = null
    recipes.forEach(r => {
      if (r.input.hasFluids() || r.input.getInputs().size() != 1 || r.output.items.size() != 1) bad++
      else if (sample == null && !r.input.getInputs().getFirst().getInputs().isEmpty()) sample = r
    })
    unsupported += bad
    if (sample == null) { failed++; return }
    var family = index == 0 ? 0 : index == 1 ? 2 : index == 2 ? 3 : 4
    ;[6,12].forEach(lanes => {
      try {
        var block = MT.MULTI_MACHINES[family * 2 + (lanes == 6 ? 0 : 1)].get()
        var machine = new Machine(new Pos(0, 0, 0), block.defaultBlockState())
        machine.setLevel(event.server.overworld())
        if (family == 4) for (var mode = 0; mode < index - 3; mode++) machine.cycleMode()
        var ingredient = sample.input.getInputs().getFirst()
        var input = ingredient.getInputs().getFirst().copyWithCount(ingredient.getAmount())
        var expected = IU.getRecipeOutput(name, false, input.copy()).output.items.getFirst()
        for (var slot = 0; slot < lanes; slot++) machine.items.setStackInSlot(slot, input.copy())
        var spent = 0
        for (var t = 0; t < machine.ticks; t++) {
          // Fill the finite FE buffer via its real capability, then measure actual debit.
          for (var fill = 0; fill < 25; fill++) machine.energy.receiveEnergy(100000, false)
          var before = machine.energy.energyStored
          machine.tick(); spent += before - machine.energy.energyStored
        }
        if (spent != machine.baseFE * lanes * machine.ticks * 4 / 5) throw 'energy=' + spent
        for (var slot = 0; slot < lanes; slot++) {
          var output = machine.items.getStackInSlot(lanes + slot)
          if (!machine.items.getStackInSlot(slot).isEmpty() || !Stack.isSameItemSameComponents(output, expected) || output.count != expected.count) throw 'lane=' + slot
        }
        results.push(name + ' x' + lanes + ': PASS; recipes=' + recipes.size() + '; unsupported=' + bad + '; FE=' + spent)
      } catch (e) { failed++; results.push(name + ' x' + lanes + ': FAIL ' + e) }
    })
  })
  JsonIO.write('local/kubejs/multimachine_check.json', {results:results, failed:failed, unsupported:unsupported})
  console.info('[day11_check] failed=' + failed + ', unsupported=' + unsupported + ', cases=' + results.length)
})
