let Prof = require('../model/prof');

// Récupérer un prof par son id (GET)
function getProf(req, res) {

    let profId = req.params.id;
    Prof.findOne({ id: profId }, (err, prof) => {
        if (err) { res.send(err) }
        res.json(prof);
    })
}

function getProfObjId(req, res) {

    let profId = req.params.id;
    Matiere.findOne({ _id: profId }, (err, matiere) => {
        if (err) { res.send(err) }
        res.json(matiere);
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
function getProfsList(req, res) {
    var aggregateQuery = Prof.aggregate();
    Prof.aggregatePaginate(aggregateQuery, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    },
        (err, profs) => {
            if (err) {
                res.send(err);
            }
            res.send(profs);
        }
    );
}

module.exports = { getProfsList,getProf, postProf, getProfObjId };