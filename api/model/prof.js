var mongoose = require('mongoose');
var ProfSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    image: String
});
mongoose.model('Prof', ProfSchema);

module.exports = mongoose.model('Prof');