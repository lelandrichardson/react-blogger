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
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var urlAppend = require('url-append');
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);
var favicon = require('serve-favicon');

var chalk = require('chalk');
var config = require('../config');
var path = require('path');

// database stuff
var db = require('./Server/sequelize');
var User = require('./Models/User');
var Blog = require('./Models/Blog');
var Version = require('./Models/Version');
var Session = require('./Models/Session');

db.sync();


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

// Setting the app router and static folder
app.use('/assets', express.static(path.resolve('./build/client')));
app.use(favicon(path.resolve('./build/client/favicon.ico')));


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
//app.use(session({
//    secret: 'my-secret-key',
//    saveUninitialized: true,
//    resave: true
//}));

// use postgres for passport session
app.use(session({
    resave: true,
    saveUninitialized: true,
    store: new pgSession({
        pg : pg,
        conString : config.database.url
    }),
    secret: config.authCookieSecret,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(passport.initialize());
app.use(passport.session());



// Serialize sessions
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id, { raw: true })
        .then(user => done(null, user), err => done(err, null));
});

// Use local strategy to create user account
passport.use('login', new LocalStrategy(function(username, password, done) {
    User.find({
        where: { username: username }
    }).then(function(user) {
        if (!user) {
            console.log("Unknown user!");
            done(null, false, { message: 'Unknown user' });
        } else if (!bcrypt.compareSync(password, user.password)) {
            console.log("Invalid password");
            done(null, false, { message: 'Invalid password'});
        } else {
            console.log("Logged in!!");
            done(null, user);
        }
    }, done);
}));

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, function(req, username, password, done) {
    User.findOrCreate({
        where: { username: username },
        defaults: {
            username: username,
            password: password,
            name: req.body.name
        }
    }).spread(function (user, created) {
        if (created) {
            console.log("User created!");
            done(null, user);
        } else {
            console.log("User already existed!");
            done(null, false, { message: 'User Already Exists'});
        }
    });
}));




// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');


app.get('/admin/login', /* AUTHENTICATE,*/ function (req, res) {
    res.render('Admin');
});

app.post('/admin/login', passport.authenticate('login', {
    failureRedirect: '/admin/login'
}), function (req, res) {
    if (req.query.returnUrl) {
        res.redirect(req.query.returnUrl);
    } else {
        res.redirect('/admin/blogs/drafts');
    }
});

app.get('/admin/register', /* AUTHENTICATE,*/ function (req, res) {
    res.render('Register');
});

app.post('/admin/register', passport.authenticate('register', {
    failureRedirect: '/admin/register'
}), function (req, res) {
    if (req.query.returnUrl) {
        res.redirect(req.query.returnUrl);
    } else {
        res.redirect('/admin/blogs/drafts');
    }
});

app.use('/admin/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

var AUTHENTICATE = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(urlAppend('/admin/login', { returnUrl: req.originalUrl }));
    }
};

app.use('/api', AUTHENTICATE, require('./Server/Api'));

app.use(['/admin','/admin/*'], AUTHENTICATE, function (req, res) {
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


// Start the app by listening on <port>
app.listen(config.port);

// Expose app
module.exports = app;