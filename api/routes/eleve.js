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
    Eleve.find((err, eleves) => {
        if (err) {
            res.send(err)
        }
        res.send(eleves);
    });
}
// Ajout d'un eleve (POST)
function postEleve(req, res) {
    let eleve = new Eleve();
    eleve.id = req.body.id;
    eleve.nom = req.body.nom;
    eleve.prenom = req.body.prenom;
    eleve.email = req.body.email;
    eleve.save((err) => {
        if (err) {
            res.send('cant post eleve ', err);
        }
        res.json({ message: `${eleve.nom} saved!` })
    })
}
function getElevesPaged(req, res) {
    var aggregateQuery = Eleve.aggregate();
    Eleve.aggregatePaginate(aggregateQuery, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    },
        (err, eleves) => {
            if (err) {
                res.send(err);
            }
            res.send(eleves);
        }
    );
}

function deleteAssignment(req,res )
{
    let eleveid = req.params.id;
    Eleve.findByIdAndRemove(eleveid, (err, eleve) => {
        if (err) {
            console.log(err + " err");
            res.send(err);
        } else {
            res.json({ message: `deleted` });
        }
    })
}

function updateEleve(req,res){
    console.log(req.body._id + 'req.body._id');
    Eleve.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, eleve) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
    });

}
module.exports = {getElevesPaged, getEleveList, getEleve, postEleve,deleteAssignment,updateEleve };