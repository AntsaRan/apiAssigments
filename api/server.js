let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let eleve = require('./routes/eleve');
let matiere = require('./routes/matiere');
let prof = require('./routes/prof');
let user = require('./routes/user');
var AuthController = require('./auth/AuthController');
var VerifyToken = require('./auth/VerifyToken');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://mb:mb@mbds.ioqjg.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
        console.log("Connecté à la base MongoDB assignments dans le cloud !");
        console.log("at URI = " + uri);
        console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
        err => {
            console.log('Erreur de connexion: ', err);
        });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/api/auth', AuthController);
// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';


//les Assignments
app.route(prefix + '/assignments')
    .get(VerifyToken, assignment.getAssignmentsPagedPopulate)
    .post(VerifyToken, assignment.postAssignment)
    .put(VerifyToken, assignment.updateAssignment);

app.route(prefix + '/assignments/np')
    .get(VerifyToken, assignment.getAssignments)

app.route(prefix + '/assignments/search/')
    .get(assignment.getAssignmentsPagedPopulateSearch);

app.route(prefix + '/assignments/:id')
    .get(VerifyToken, assignment.getAssignment)
    .delete(VerifyToken, assignment.deleteAssignment);

/* USER */
app.route(prefix + '/auth/:id',)
    .get(user.getUSer);

//Les eleves
app.route(prefix + '/eleve')
    .get(eleve.getElevesPaged)
    .post(eleve.postEleve)
    .put(VerifyToken, eleve.updateEleve);

app.route(prefix + '/eleveList')
    .get(eleve.getEleveList);


app.route(prefix + '/eleve/:id')
    .get(eleve.getEleve)
    .delete(VerifyToken, eleve.deleteAssignment);

//Les matiere
app.route(prefix + '/matiere')
    .get(matiere.getMatiereList)
    .post(matiere.postMatiere);

app.route(prefix + '/matiere/:id')
    .get(matiere.getMatiere);

app.route(prefix + '/matiereObjId/:id')
    .get(matiere.getMatiereObjId);

//Les prof
app.route(prefix + '/prof')
    .get(prof.getProfsList)
    .post(prof.postProf);

app.route(prefix + '/prof/:id')
    .get(prof.getProf);
app.route(prefix + '/profObjId/:id')
    .get(prof.getProfObjId);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;