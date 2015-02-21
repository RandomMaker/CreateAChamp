var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
 	res.render('positions', { title: 'Available Positions' });
});

module.exports = router;
