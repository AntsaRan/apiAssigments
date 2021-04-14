const { ObjectId } = require('bson');
var aggreatePaginate = require("mongoose-aggregate-paginate-v2");

var mongoose = require('mongoose');
var EleveSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    prenom:String,
    email:String,
});

EleveSchema.plugin(aggreatePaginate);
mongoose.model('Eleve', EleveSchema);

module.exports = mongoose.model('Eleve');