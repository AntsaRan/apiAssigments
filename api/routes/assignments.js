let Assignment = require('../model/assignment');

/* Récupérer tous les assignments (GET)
function getAssignments(req, res){
    console.log("gets");
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
      //  console.log(assignments);
        res.send(assignments);
    });
} */


// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery, {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    console.log("post");
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateRendu = req.body.dateRendu;
    assignment.rendu = req.body.rendu;
    assignment.id_eleve = req.body.id_eleve;
    assignment.id_matiere = req.body.id_matiere;
    assignment.note = req.body.note;
    assignment.remarque = req.body.remarque;

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!` })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body.id);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }

        // console.log('updated ', assignment)
    });

}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {

    let assignmentId = req.params.id;
    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}
// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    let assignmentId = req.params.id;
    Assignment.findByIdAndRemove(assignmentId, (err, assignment) => {
        if (err) {
            console.log(err + " err");
            res.send(err);
        } else {
            res.json({ message: `deleted` });
        }
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };