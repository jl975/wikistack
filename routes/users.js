var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});


module.exports = router;
