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
            console.log(JSON.stringify(assignments) + " OUOUOuUOUOU");
            res.send(assignments);
        }
    );
}

function getAssignmentsPagedSimple(req, res) {
    var aggregateQuery = Assignment.aggregate();

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        populate: 'id_eleve',
    };
    Assignment.paginate({}, options,
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            console.log(JSON.stringify(assignments) + " OUOUOuUOUOU");
            res.send(assignments);
        });
}
function getAssignmentsPaged2(req, res) {
    /*return Assignment.findOne({ _id: '606ca28462f5fd134cc1132e' })
        .populate("id_eleve")
        .exec((err, results) => {
            if (err) {
                res.send(err);
            }
            console.log(JSON.stringify(results) + " OUOUOuUOUOU");
            res.send(results);
        })*/
    this.getTutorialWithPopulate(req.params._id);

}
function getAssignmentsPaged(req, res) {
    /*return Assignment.findById(id).populate("id_eleve");*/
    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        populate: 'id_eleve',
        lean: true,
    };
    return Assignment.paginate({}, options);
    console.log(id + " IIIIIIIIIIIIIIIIIIIID");
    //return Assignment.findOne({ _id:id}).populate("id_eleve");

}

const getAssignmentsPagedPopulate = async function (req, res) {
    var tutorial = await getAssignmentsPaged(req, res);
    if (!tutorial) {
        res.send("err");
    }
    console.log(JSON.stringify(tutorial) + " OUOUOuUOUOU");
    res.send(tutorial);
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
    console.log(assignmentId + " DELETE ASSIGNMENT ");
    Assignment.findByIdAndRemove(assignmentId, (err, assignment) => {
        if (err) {
            console.log(err + " err");
            res.send(err);
        } else {
            res.json({ message: `deleted` });
        }
    })
}



module.exports = { getAssignmentsPaged, getAssignmentsPagedPopulate, getAssignmentsPaged2, getAssignmentsPaged, getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };