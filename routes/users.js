var express = require('express');
var router = express.Router();
var models = require('../models');

var User = models.User;
var Page = models.Page;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then(function(users){
  	console.log(users);
    res.render('users', { users: users, pagetitle: 'Users' });
  }).catch(next);
});


router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	// Page.find({author: id}).exec().then(function(pages) {
	// 	console.log("pages: "+pages);
	// 	// User.findOne({_id: id}).exec().then(function(user) {
	// 	// 	res.render('userpage', {user: user, pages: pages})
	// 	// });		
	// });

	var waitFor = [User.findOne({_id: id}).exec(), Page.find({author: id}).exec()];
	Promise.all(waitFor)
	.then(function(stuff) {
		var user = stuff[0];
		var pages = stuff[1];
		console.log(pages);
		res.render('userpage', {user: user, pages: pages});
	});


	// .then(function(user) {
	// 	var pages = Page.find({author: id}).exec().then()
	// 	return Page.find({author: id}).exec()
	// })
	// .then(function(pages) {

	// });	


});



module.exports = router;
