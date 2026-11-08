// T33: проверка рецептов без JEI. Список id — _server/check_list.txt (check.bat переводит его в check_list.json), запуск — _server/check.bat
ServerEvents.loaded(function (event) {
  var list
  try { list = JsonIO.readJson('check_list.json').asList() } catch (e) { return }
  var server = event.server, rm = server.getRecipeManager()
  var name = function (st) { return st.isEmpty() ? '-' : st.getCount() + 'x ' + st.id }
  list.forEach(function (el) {
    var id = String(el.getAsString())
    var h = rm.byKey(id).orElse(null)
    if (!h) { console.info('[check] MISSING ' + id); return }
    var r = h.value(), cnt = {}, ins = []
    r.getIngredients().forEach(function (ing) {
      var items = ing.stackArray
      if (items.length) { var k = String(items[0].id); cnt[k] = (cnt[k] || 0) + 1 }
    })
    for (var k in cnt) ins.push(cnt[k] + 'x ' + k)
    var outp = '?'
    try { outp = name(r.getResultItem(server.registryAccess())) } catch (e) {}
    console.info('[check] OK ' + id + ': ' + (ins.length ? ins.join(', ') : '(вход не виден)') + ' → ' + outp)
  })
})
