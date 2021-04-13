var mongoose = require('mongoose');

var MatiereSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    id_prof: Number,
    image: String
});
mongoose.model('Matiere', MatiereSchema);

module.exports = mongoose.model('Matiere');