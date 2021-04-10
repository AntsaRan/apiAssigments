var mongoose = require('mongoose');
var EleveSchema = new mongoose.Schema({
    id: Number,
    nom: String
});
mongoose.model('Eleve', EleveSchema);

module.exports = mongoose.model('Eleve');