var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// Registration form from modal
router.post('/', function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var html = 'Hello ' + firstName + '!<br>' + lastName +
		'<a href="/">Try again.</a>';
	res.send(html);
});

module.exports = router;
