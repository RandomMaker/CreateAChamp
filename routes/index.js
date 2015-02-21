var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Project Gold' });
});

// Registration form from modal
router.post('/', function(req, res){
	var fullName = req.body.fullName;
	var email = req.body.email;
	var club = req.body.club;
	var teamMembers = req.body.teamMembers;
});

module.exports = router;
