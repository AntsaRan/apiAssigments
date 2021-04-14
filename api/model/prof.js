var mongoose = require('mongoose');
var aggreatePaginate = require("mongoose-aggregate-paginate-v2");

var ProfSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    prenom:String,
    image: String,
});
ProfSchema.plugin(aggreatePaginate);
mongoose.model('Prof', ProfSchema);

module.exports = mongoose.model('Prof');