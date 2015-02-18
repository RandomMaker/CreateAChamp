var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var html = 'Hello ' + firstName + '!<br>' +
		'<a href="/">Try again.</a>';
	res.send(html);
});

module.exports = router;
