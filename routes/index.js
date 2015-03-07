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
	connection.query('INSERT INTO ProjectGold.Applications (fullName, email, phone, club, makesYou, teamMembers) VALUES (?, ?, ?, ?, ?, ?)', [fullName, email, phone, club, makesYou, teamMembers], function(err, rows, fields) {
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

	// Send confirmation e-mail using nodemailer
	var mailOptions = {
	    from: "Project Gold Team",
	    to: email,
	    subject: "Project Gold Registration Confirmation",
	    text: "Thank you for regisistering for Project Gold! This is a confirmation e-mail letting you know that it was successful.",
	    html: "<h1>Thank you for regisistering for Project Gold!</h1><br/> This is a confirmation e-mail letting you know that it was successful. Please stay tuned to your e-mail and social media for updates on the competition."
	}

	transporter.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }
	});
});

module.exports = router;
