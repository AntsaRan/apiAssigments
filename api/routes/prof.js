let Prof = require('../model/prof');

// Récupérer un prof par son id (GET)
function getProf(req, res) {

    let profId = req.params.id;
    Prof.findOne({ id: profId }, (err, prof) => {
        if (err) { res.send(err) }
        res.json(prof);
    })
}

// Ajout d'un prof (POST)
function postProf(req, res) {
    console.log("post prof");
    let prof = new Prof();
    prof.id = req.body.id;
    prof.nom = req.body.nom;
    prof.image = req.body.image;
    prof.save((err) => {
        if (err) {
            res.send('cant post prof ', err);
        }
        res.json({ message: `${prof.nom} saved!` })
    })
}

module.exports = { getProf, postProf };