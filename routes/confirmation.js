var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
 	res.render('confirmation', { title: 'Thank you for registering!' });
});

module.exports = router;
