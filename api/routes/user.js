let User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const user = require('../model/user');

function getUSer(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });

}
function login(req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.send(err);
        } else if (!user) {
            res.send(err);
        } else {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, id: user._id, username: user.username, isadmin:user.isadmin,token: token });
        }
    });
}



module.exports = { getUSer, login };
