var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mime = require('mime');

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
router.post('/', function(req, res, next){
 
    var form = new multiparty.Form();
 
    form.parse(req, function (err, fields, files) {
 
        if (err) return next(err);
 
        var fullName = fields.fullName[0];
        var email = fields.email[0];
        var phone = fields.phone[0];
        var club = fields.club[0];
        var makesYou = fields.makesYou[0];
        var teamMembers = fields.teamMembers[0];
 
        console.log(files);

        if (files.file && files.file[0].size > 0) {
        	var allowedMimeTypes = [
                'text/plain',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword'
            ];
   
            if (allowedMimeTypes.indexOf(mime.lookup(files.file[0].path)) === -1) {
                console.log('Unsupported filetype! ' + mime.lookup(files.file[0].path));
            } else {
            	var random = Math.floor(Math.random()*999999) + 100000;
            	if (!fs.existsSync('resumes/'+fullName+'-'+random)){
				    fs.mkdirSync('resumes/'+fullName+'-'+random);
				}
                fs.createReadStream(files.file[0].path).pipe(fs.createWriteStream('resumes/' + fullName + '-' + random + '/' + files.file[0].originalFilename));
                console.log('File uploaded successfully! Local patch: ' + files.file[0].path);
        	}
        }
 
        // SQL queries for application
        connection.query('INSERT INTO ProjectGold.Applications (fullName, email, phone, club, makesYou, teamMembers) VALUES (?, ?, ?, ?, ?, ?)', [fullName, email, phone, club, makesYou, teamMembers], function(err, rows, fields) {
            if (!err){
                console.log('Query Successful! Existing: ' , rows);
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
            } else {
                console.log("Message sent: " + response.message);
            }
        });
    });
});

module.exports = router;
