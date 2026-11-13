// T101: Oritech в прогрессии (_ai/oritech_audit.md). Раньше машины Oritech делались из меди/никеля/стали в первый час
// и давали «имбу» на старте (лазер-шахтёр, глубинный бур, ускоритель, спавнер). Теперь каждая машина тянет деталь своей
// ступени из паутины: S1 улучш. электросхема IU · S2 пропитанный сплав Mekanism / флюорит · S3 хризолит · S4 заряж. аметрин
// (S5 ядро виверны — реактор, power_gates.js). Способ web_3: в родном рецепте одна ячейка (или симметричная пара) → гейт,
// webSetCell (web_3_energy.js) — форма и основа рецепта Oritech сохраняются. Генераторы big solar / топливный / паровой
// и реактор уже заперты в power_gates.js (replaceInput) — здесь их нет, чтобы правки не наложились.
var O1 = 'industrialupgrade:crafting_elements/crafting_273_element', O2 = 'mekanism:alloy_infused', OF = 'kubejs:fluorite_crystal'
var O3 = 'kubejs:chrysolite_crystal', O4 = 'kubejs:energized_ametrine_crystal'
var ORI = 'oritech:crafting/'

// [id рецепта, строка, столбец, деталь] — у сеток «fff/fcf/sbs» и «fff/mcm/sbs» [0,1] — верх по центру (ось симметрии),
// у «fsf/mcm/bbb» [0,1] — верхняя деталь, [2,1] — середина нижнего ряда.
var WEB8 = [
  // --- ключевые детали: мотор через механический компонент IE (паутина с первого часа), продвинутая батарея — S2
  ['oritech:motor/motorcraft', 0, 1, 'immersiveengineering:component_iron'], // вместо никеля сверху: мотор — S0–S1 через IE
  ['oritech:motor/advbattery', 0, 1, O2], // вместо электрума сверху: батарея → ступень S2 (на ней большая панель, экзо-броня, хранилища)
  // --- S1: переработка как у дробителя/печи IU (×2 руды) и лава-генератор 64 FE/т (сильнее стартовых 32–40)
  [ORI + 'pulverizer', 0, 1, O1], [ORI + 'pulverizeralt', 0, 1, O1],
  [ORI + 'electricfurnace', 0, 1, O1], [ORI + 'electricfurnacealt', 0, 1, O1],
  [ORI + 'foundry', 0, 1, O1], [ORI + 'treefeller', 0, 1, O1],
  [ORI + 'pump', 0, 1, O1], ['oritech:compat/enderio/crafting/pump', 0, 1, O1],
  [ORI + 'charger', 0, 1, O1], [ORI + 'chargeralt', 0, 1, O1],
  [ORI + 'lavagen', 0, 1, O1],
  // --- S2: сборщик (процессоры), центрифуга, био-генератор 64, фермы/постройщик, нефтеперегонка, беспроводной столб,
  //     малое хранилище 1M FE (как базовый куб Mekanism — тоже флюорит)
  [ORI + 'assembler', 0, 1, O2], [ORI + 'assembleralt', 0, 1, O2],
  [ORI + 'centrifuge', 0, 1, O2], [ORI + 'centrifugealt', 0, 1, O2],
  [ORI + 'biogen', 0, 1, O2], [ORI + 'fertilizer', 0, 1, O2], [ORI + 'placer', 0, 1, O2],
  [ORI + 'refinery', 0, 0, O2], [ORI + 'refinery', 0, 2, O2], // пустые верхние углы — пара
  [ORI + '_pole', 0, 1, O2], // пустая клетка между катушками
  [ORI + 'smallstorage', 0, 1, OF],
  // --- S3: лазер-шахтёр (128 блоков), атомная кузня, кузня осколков (×3 руды), большое хранилище 20M, порт дронов,
  //     катализатор зачарований, простая станция аугментов
  [ORI + 'laserarm', 2, 1, O3], [ORI + 'atomicforge', 2, 1, O3], [ORI + 'crusher', 0, 1, O3],
  [ORI + 'bigstorage', 2, 1, O3], [ORI + 'droneport', 2, 1, O3], [ORI + 'droneportalt', 2, 1, O3],
  [ORI + 'catalyst', 0, 1, O3], [ORI + 'catalyst_alt', 0, 1, O3], [ORI + 'augment/basic', 0, 1, O3],
  // --- S4: бесконечная руда (глубинный бур), ускоритель частиц, спавнер, зачарователь, старшие станции аугментов
  [ORI + 'deepdrill', 2, 1, O4], [ORI + 'particlecontroller', 0, 1, O4], [ORI + 'spawner', 0, 1, O4],
  [ORI + 'enchanter', 0, 1, O4], [ORI + 'augment/advanced', 0, 1, O4], [ORI + 'augment/arcane', 0, 1, O4]
]

ServerEvents.recipes(function (event) {
  var done = 0
  WEB8.forEach(function (s) {
    event.forEachRecipe({ id: s[0] }, function (r) { webSetCell(r, s[1], s[2], s[3]); done++ })
  })
  console.info('[web_8] Oritech: гейтов ступеней ' + done + ' из ' + WEB8.length)
})
