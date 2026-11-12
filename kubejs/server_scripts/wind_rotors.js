// T88: роторы ветряка Maelstrom Tech (5 тиров выше иридиевого ротора IU, WindRotorItem). Лестница «Ветер» как в LoliLand:
// каждый ротор = прошлый ротор в центре + материал ступени по углам и кромкам (симметрично).
// Ступени: хризолит S3, заряж. аметрин + атомный сплав S3–S4, квантовое ядро + плутоний S4, ядро wyvern S5, пробуждённое ядро S5.
var WR = function (s) { return 'maelstromtech:' + s + '_wind_rotor' }
var WIND_ROTORS = [
  [WR('chrysolite'), 'kubejs:chrysolite_crystal', 'industrialupgrade:crafting_elements/crafting_285_element', 'industrialupgrade:rotor/iridium'],
  [WR('ametrine'), 'kubejs:energized_ametrine_crystal', 'mekanism:alloy_atomic', WR('chrysolite')],
  [WR('quantum'), 'kubejs:quantum_core', 'mekanism:pellet_plutonium', WR('ametrine')],
  [WR('void'), 'draconicevolution:wyvern_core', 'kubejs:dispersion_core', WR('quantum')],
  [WR('singularity'), 'draconicevolution:awakened_core', 'kubejs:gravitomagnetic_core', WR('void')]
]

ServerEvents.recipes(function (event) {
  WIND_ROTORS.forEach(function (r) {
    event.shaped(r[0], ['ABA', 'BRB', 'ABA'], { A: r[1], B: r[2], R: r[3] }).id('kubejs:t88/' + r[0].split(':')[1])
  })
  console.info('[check] wind_rotors: ' + WIND_ROTORS.length + ' recipes')
})
