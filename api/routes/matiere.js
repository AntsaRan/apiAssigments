let Matiere = require('../model/matiere');

// Récupérer un matiere par son id (GET)
function getMatiere(req, res) {

    let matiereId = req.params.id;
    Matiere.findOne({ id: matiereId }, (err, matiere) => {
        if (err) { res.send(err) }
        res.json(matiere);
    })
}

function getMatiereObjId(req, res) {

    let matiereId = req.params.id;
    Matiere.findOne({ _id: matiereId }, (err, matiere) => {
        if (err) { res.send(err) }
        res.json(matiere);
    })
}

function getMatiereList(req, res) {
    console.log(" GetMatiereList");
    Matiere.find((err, matieres) => {
        if (err) {
            res.send(err)
        }
        res.send(matieres);
    });
}
// Ajout d'un matiere (POST)
function postMatiere(req, res) {
    console.log("post matiere");
    let matiere = new Matiere();
    matiere.id = req.body.id;
    matiere.nom = req.body.nom;
    matiere.id_prof = req.body.id_prof;
    matiere.image = req.body.image;
    matiere.save((err) => {
        if (err) {
            res.send('cant post matiere ', err);
        }
        res.json({ message: `${matiere.nom} saved!` })
    })
}

module.exports = { getMatiereList, getMatiere, postMatiere, getMatiereObjId };