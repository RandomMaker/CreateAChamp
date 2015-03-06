var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Project Gold' });
    connection.query('SELECT * FROM Applications', function(err, rows, fields) {
        if (!err){
            console.log(rows);
        } else {
            console.log('Error performing query.');
        }
    });
});

// Registration form modal
router.post('/', function(req, res){
	var fullName = req.body.fullName;
	var email = req.body.email;
	var phone = req.body.phone;
	var club = req.body.club;
	var makesYou = req.body.makesYou;
	var teamMembers = req.body.teamMembers;

	// SQL queries for application
	connection.query("INSERT INTO ProjectGold.Applications (fullName, email, phone, club, makesYou, teamMembers) VALUES ('"+fullName+"', '"+email+"', '"+phone+"', '"+club+"', '"+makesYou+"', '"+teamMembers+"')", function(err, rows, fields) {
        if (!err){
            console.log('Query Successful: ' , rows);
        } else {
        	console.log(err);
            console.log('Error performing query.');
        }
    });

	// Process first name for confirmation
	var process = fullName.split(" ");
	var firstName = process[0];
	res.render('confirmation', { firstName : firstName });
});

module.exports = router;
