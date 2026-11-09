// DAY11: IU machines replaced by validated parallel machines.
var DAY11_OLD = ["industrialupgrade:moremachine/triple_macerator", "industrialupgrade:moremachine/triple_furnace", "industrialupgrade:moremachine/triple_commpressor", "industrialupgrade:moremachine/triple_extractor", "industrialupgrade:moremachine/quad_macerator", "industrialupgrade:moremachine/quad_furnace", "industrialupgrade:moremachine/quad_commpressor", "industrialupgrade:moremachine/quad_extractor"]
RecipeViewerEvents.removeEntries('item', event => DAY11_OLD.forEach(id => event.remove(id)))
