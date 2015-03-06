var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var mysql = require('mysql');

// MySQL Connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : 'ProjectGold'
});

connection.connect(function(err){
    if(!err) {
        console.log("MySQL Database is connected!");  
    } else {
        console.log("Error connecting to MySQL Datbaase!");  
    }
});

global.connection = connection;

// Nodemailer Connection Configuration
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});

global.transporter = transporter;

var routes = require('./routes/index');
var positions = require('./routes/positions');
var confirmation = require('./routes/confirmation')

var app = express();


// force www. redirect, for production
// app.all(/.*/, function(req, res, next) {
//     var host = req.header("host");
//     if (host.match(/^www\..*/i)) {
//         next();
//     } else {
//         res.redirect(301, "http://www." + host);
//     }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/positions', positions);
app.use('/confirmation', confirmation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
