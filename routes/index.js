var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Project Gold' });
});

// Registration form modal
router.post('/', function(req, res){
	var fullName = req.body.fullName;
	var email = req.body.email;
	var phone = req.body.phone;
	var club = req.body.club;
	var makesYou = req.body.makesYou;
	var teamMembers = req.body.teamMembers;
	var process = fullName.split(" ");
	var firstName = process[0];
	console.log(firstName);
	res.render('confirmation', {firstName:firstName});
});

module.exports = router;
