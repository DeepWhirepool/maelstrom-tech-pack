// priority: -100
// DAY11: validated x6/x12 replacements; remove old machine recipes by their actual IDs.
var DAY11_OLD = ["industrialupgrade:moremachine/triple_macerator", "industrialupgrade:moremachine/triple_furnace", "industrialupgrade:moremachine/triple_commpressor", "industrialupgrade:moremachine/triple_extractor", "industrialupgrade:moremachine/quad_macerator", "industrialupgrade:moremachine/quad_furnace", "industrialupgrade:moremachine/quad_commpressor", "industrialupgrade:moremachine/quad_extractor"]
ServerEvents.recipes(e => {
  ["kubejs:ll_ic2/moremachine_triple_macerator", "kubejs:ll_ic2/moremachine_triple_furnace", "kubejs:ll_ic2/moremachine_triple_commpressor", "kubejs:ll_ic2/moremachine_triple_extractor", "industrialupgrade:industrialupgrade_1326", "industrialupgrade:industrialupgrade_1374", "industrialupgrade:industrialupgrade_1380", "industrialupgrade:industrialupgrade_1377"].forEach(id => e.remove({id:id}))
})
