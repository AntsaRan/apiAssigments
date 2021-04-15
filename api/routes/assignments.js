let Assignment = require('../model/assignment');


function getAssignments(req, res){
    console.log("gets");
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
      //  console.log(assignments);
        res.send(assignments);
    });
} 


// Récupérer tous les assignments (GET) ( version TP)
/*function getAssignments(req, res) {
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
}*/


/*function getAssignmentsPagedSimple(req, res) {
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
            res.send(assignments);
        });
}
*/



// Ajout d'un assignment (POST)
function postAssignment(req, res) {
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
        res.json({ message:'saved!' })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
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
    console.log(assignmentId + " API ASS ID");
    Assignment.findOne({ id: assignmentId })
        .populate('id_eleve')
        .populate('id_matiere')
        .exec(function (err, assignment) {
            if (err) { res.send(err) }
            console.log(assignment.nom + " NOM API ASS");
            res.json(assignment);
        });
}

const getAssignmentsPagedPopulate = async function (req, res) {
    var assignments = await getAssignmentsPaged(req);
    if (!assignments) {
        res.send("err");
    }
    res.send(assignments);
}
function getAssignmentsPaged(req) {

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        populate: ['id_eleve', 'id_matiere'],
    };
    return Assignment.paginate({}, options);
}

const getAssignmentsPagedPopulateSearch = async function (req, res) {
    var assignments = await searchAssignment(req,res);
    if (!assignments) {
        res.send("err");
    }
    res.send(assignments);
}
function searchAssignment(req,res) {
    let search = req.query.search;
    let query = { nom: { $regex: new RegExp(search), $options: "i" } };

        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            populate: ['id_eleve', 'id_matiere'],
        };
        return Assignment.paginate(query, options);
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



module.exports = {
    getAssignmentsPaged,
    getAssignmentsPagedPopulate,
    getAssignmentsPaged,
    postAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment,searchAssignment,getAssignmentsPagedPopulateSearch,getAssignments
};