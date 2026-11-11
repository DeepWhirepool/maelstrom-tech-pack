// U1: UU-материя в стиле IC2 classic, без сканера и репликатора (они скрыты). Зачем: источник иридия и редких ресурсов за энергию.
// UU в IU — только жидкость. Цена в config/industrialupgrade-common.toml снижена с 1M до 1000 EU/mB (adv 900, imp 800, per 700):
// 1 ведро = 1M EU = 1 UU IC2 classic. Утиль в усилителе: 1 входящий EU даёт 6 EU, до 83% экономии (javap BlockEntityMultiMatter).
// Ведро UU в сетке = 1M EU, пустое ведро возвращается.
var IUM = 'industrialupgrade:', UU = IUM + 'bucket/uu_matter'
ServerEvents.recipes(function (event) {
  var G3 = 'kubejs:chrysolite_crystal', G4 = 'mekanism:pellet_plutonium', ACIR = IUM + 'crafting_elements/crafting_273_element'
  var LAP = IUM + 'battery/lapotron_crystal', EC = 'mekanism:elite_control_circuit', UC = 'mekanism:ultimate_control_circuit'
  // машины: старые рецепты IU из скрытых предметов не годятся. Фабрикатор как масс-фабрикатор IC2, без иридия (иначе круг), S3;
  // улучшенные S4: плутоний + 1 прошлый тир.
  var M = [
    ['simplemachine/generator_matter', ['GCG', 'LML', 'GXG'], { G: 'minecraft:glowstone_dust', C: ACIR, L: LAP, M: IUM + 'blockresource/advanced_machine', X: G3 }],
    ['moremachine3/assamplerscrap', [' X ', 'CMC', ' A '], { X: G3, C: IUM + 'simplemachine/compressor_iu', M: IUM + 'blockresource/machine', A: ACIR }],
    ['basemachine/adv_matter', [' P ', 'LML', ' C '], { P: G4, L: LAP, M: IUM + 'simplemachine/generator_matter', C: EC }],
    ['basemachine/imp_matter', [' P ', 'LML', ' C '], { P: G4, L: LAP, M: IUM + 'basemachine/adv_matter', C: UC }],
    ['basemachine/per_matter', [' P ', 'IMI', ' C '], { P: G4, I: IUM + 'crafting_elements/crafting_285_element', M: IUM + 'basemachine/imp_matter', C: UC }]
  ]
  M.forEach(function (m) {
    event.remove({ output: IUM + m[0] })
    event.shaped(IUM + m[0], m[1], m[2]).id('kubejs:uu/' + m[0].split('/')[1])
  })
  // цены: иридий 2M, алмаз и изумруд 0.5M, осмий и уран 0.25M EU за штуку
  var R = [
    ['osmium', 'mekanism:ingot_osmium', 4, ['U']],
    ['diamond', 'minecraft:diamond', 4, ['UU']],
    ['emerald', 'minecraft:emerald', 4, ['U', 'U']],
    ['uranium', 'mekanism:ingot_uranium', 8, ['U ', ' U']],
    ['iridium', IUM + 'crafting_elements/crafting_291_element', 2, ['UU', 'UU']]
  ]
  R.forEach(function (r) { event.shaped(Item.of(r[1], r[2]), r[3], { U: UU }).replaceIngredient(UU, 'minecraft:bucket').id('kubejs:uu/' + r[0]) })
  console.info('[uu_matter] ' + (M.length + R.length) + ' recipes')
})
