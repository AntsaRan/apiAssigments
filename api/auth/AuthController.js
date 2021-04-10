
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../model/user');
var VerifyToken = require('./VerifyToken');
var userjs = require('../routes/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const user = require('../model/user');

router.post('/register', function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let user = new User();
    user.username = req.body.username;
    user.password = hashedPassword;
    user.isadmin = req.body.isadmin;
    user.save(
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });

  router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) res.send("There was a problem finding the user.",err);
      if (!user) res.send("No user found.");

      res.status(200).send(user);
    });
  });

  router.use(function (user, req, res, next) {
    res.status(200).send(user);
  });

  router.post('/login', function(req, res) {
    userjs.login(req,res);
  });

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  module.exports = router;
