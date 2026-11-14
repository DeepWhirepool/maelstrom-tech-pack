// T106 п.2: слиток + молот → пластина на верстаке для всех металлов, у которых в паке есть пластина.
// Зачем: раньше было 6 металлов и только молот IU, а игрок берёт молот IE (им же дробит руду) — оловянная пластина «не крафтилась».
// Молот любой: IU (T77, теряет 1 прочность) или инженерный IE (тоже теряет прочность). Тип обычный shapeless — остаток крафта
// даёт сам предмет. Пластина IU, если есть, иначе IE (Almost Unified всё равно выдаёт единый вариант).
// Не делаем: иридий (поздняя деталь IU), графит HOP (у IE пластина только из разливочной машины).
var HP_REG = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
var HP_RL = Java.loadClass('net.minecraft.resources.ResourceLocation')
function hpHas(id) { return HP_REG.containsKey(HP_RL.parse(id)) } // предмет есть в реестре (Item.of на неизвестном id падает)
var HP_TOOL = ['industrialupgrade:forge_hammer', 'immersiveengineering:hammer']
var HP_METALS = ['iron', 'copper', 'gold', 'tin', 'bronze', 'lead', 'steel', 'silver', 'nickel', 'electrum', 'constantan', 'invar',
  'aluminum', 'aluminium', 'uranium', 'zinc', 'cobalt', 'platinum', 'tungsten', 'titanium', 'chromium', 'vanadium', 'magnesium',
  'manganese', 'germanium', 'mikhail', 'spinel', 'caravky']

ServerEvents.recipes(function (event) {
  var n = 0, skip = []
  HP_METALS.forEach(function (m) {
    var ing = ['minecraft:' + m + '_ingot', 'industrialupgrade:itemingots/' + m + '_ingot', 'mekanism:ingot_' + m,
      'immersiveengineering:ingot_' + m].filter(hpHas)
    var out = ['industrialupgrade:itemplates/' + m + '_plate', 'immersiveengineering:plate_' + m].filter(hpHas)[0]
    if (!ing.length || !out) return skip.push(m)
    event.remove({ id: 'kubejs:ic2/hand_plate_' + m })
    event.shapeless(out, [ing, HP_TOOL]).id('kubejs:ic2/hand_plate_' + m)
    n++
  })
  console.info('[check] hand_plates: ' + n + ' recipes' + (skip.length ? ', skipped: ' + skip.join(' ') : ''))
})
