let Eleve = require('../model/eleve');

// Récupérer un eleve par son id (GET)
function getEleve(req, res) {
    let eleveId = req.params.id;
    Eleve.findOne({ id: eleveId }, (err, eleve) => {
        if (err) { res.send(err) }
        res.json(eleve);
    })
}
function getEleveList(req, res) {
    console.log(" GETELEVELIST");
    Eleve.find((err, eleves) => {
        if (err) {
            res.send(err)
        }
         console.log(JSON.stringify(eleves));
        res.send(eleves);
    });
}
// Ajout d'un eleve (POST)
function postEleve(req, res) {
    console.log("post eleve");
    let eleve = new Eleve();
    eleve.id = req.body.id;
    eleve.nom = req.body.nom;
    eleve.save((err) => {
        if (err) {
            res.send('cant post eleve ', err);
        }
        res.json({ message: `${eleve.nom} saved!` })
    })
}

module.exports = { getEleveList, getEleve, postEleve };