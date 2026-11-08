// T2: лёгкий режим рецептов Industrial Upgrade. В конфиге мода такого переключателя нет.
//
// Зачем: длинные цепочки промежуточных деталей IU занимают много игрового времени, а сборка рассчитана на 2-3 часа в день.
// Что меняется: выход всех рецептов верстака, создающих детали crafting_elements, удвоен.
// Детали стоят вдвое дешевле на каждом шаге, поэтому глубокие цепочки дешевеют сильнее простых.
// Что не меняется: сами ингредиенты и форма рецептов, машины, слитки, блоки и инструменты.
// Безопасность: среди этих рецептов нет петель, которые могли бы размножать предметы (проверено по рецептам и тегам из jar IU).
// Машинные рецепты IU в менеджере рецептов отсутствуют, поэтому этим способом их изменить нельзя.

var IU_EASY_OUTPUT_MULTIPLIER = 2
var IU_EASY_RECIPE_TYPES = ['industrialupgrade:shaped_recipe', 'industrialupgrade:shapeless_recipe']

ServerEvents.recipes(function (event) {
  var changed = 0

  event.forEachRecipe({}, function (r) {
    var json = r.json
    if (!json.has('type') || !json.has('result')) return
    if (IU_EASY_RECIPE_TYPES.indexOf(String(json.get('type').getAsString())) < 0) return

    var result = json.getAsJsonObject('result')
    if (String(result.get('id').getAsString()).indexOf('industrialupgrade:crafting_elements/') !== 0) return

    var count = result.has('count') ? result.get('count').getAsInt() : 1
    result.add('count', JsonIO.parseRaw(String(count * IU_EASY_OUTPUT_MULTIPLIER)))
    r.save()
    changed++
  })

  console.info('[iu_easy] crafting_elements recipes doubled: ' + changed)
})
