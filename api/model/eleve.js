const { ObjectId } = require('bson');
var mongoose = require('mongoose');
var EleveSchema = new mongoose.Schema({
    _id:ObjectId,
    id: Number,
    nom: String
});
mongoose.model('Eleve', EleveSchema);

module.exports = mongoose.model('Eleve');