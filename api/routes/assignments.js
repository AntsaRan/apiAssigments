let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    console.log("gets");
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
        console.log(assignments);
        res.send(assignments);
    });
}



// Ajout d'un assignment (POST)
function postAssignment(req, res){
    console.log("post");
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body.id);
    Assignment.findOneAndUpdate(req.body.id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
   
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}
// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    let assignmentId = req.params.id;
    Assignment.findOneAndRemove({id: assignmentId}, (err, assignment) => {
        if (err) {
            console.log(err+" err");
            res.send(err);
        }else{
            res.json({message: `deleted`});
        }
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
