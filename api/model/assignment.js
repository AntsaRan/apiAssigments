const { Double, Decimal128 } = require('bson');
let mongoose = require('mongoose');
var aggreatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateRendu: Date,
    nom: String,
    rendu: Boolean,
    id_eleve: Number,
    id_matiere: Number,
    note: Number,
    remarque: String
});

AssignmentSchema.plugin(aggreatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);