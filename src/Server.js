// polyfill
require('es6-shim');

// modules
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var compress = require('compression');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var passport = require('passport');
var sequelize = require('sequelize');
var chalk = require('chalk');
var config = require('../config');
var path = require('path');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Init the express application
var app = express();

// Setting application local variables
app.locals.title = config.title;
app.locals.description = config.description;
app.locals.keywords = config.keywords;
//app.locals.jsFiles = config.getJavaScriptAssets();
//app.locals.cssFiles = config.getCSSAssets();


// Passing the request url to environment locals
app.use(function ( req, res, next ) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    next();
});

// Should be placed before express.static
app.use(compress({
    filter: function ( req, res ) {
        return (/json|text|javascript|css/i).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

app.set('view engine', 'ejs');
app.set('views', './src/Views');

// Enable logger (morgan)
app.use(morgan('combined', {}));

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// CookieParser should be above session
app.use(cookieParser());

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

// Setting the app router and static folder
app.use('/assets', express.static(path.resolve('./build')));

var AUTHENTICATE = passport.authenticate('local', { failureRedirect: '/login' })

// TODO: handle routes
//app.use('/api', require('./Api'));

app.use('/admin/*', /* AUTHENTICATE,*/ function (req, res) {
    res.render('Admin');
});

app.use('/*', function (req, res) {
    res.render('Client');
});



// Assume 'not found' in the error msgs is a 404.
// this is somewhat silly, but valid, you can do whatever you like, set properties,
// use instanceof etc.
//app.use(function ( err, req, res, next ) {
//    // If the error object doesn't exists
//    if (!err) {
//        return next();
//    }
//
//    // Log it
//    console.error(err.stack);
//
//    // Error page
//    //TODO: make an error pge
//    res.status(500).json({
//        error: err
//    });
//});
//
//// Assume 404 since no middleware responded
//app.use(function ( req, res ) {
//    res.status(404).json({
//        url: req.originalUrl,
//        error: 'Not Found'
//    });
//});


// Bootstrap passport config
//require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
module.exports = app;