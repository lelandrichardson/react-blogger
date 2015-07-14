var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);
var urlAppend = require('url-append');

var User = require('../Models/User');

export function security(config) {

    var middleware = [
        // CookieParser should be above session
        cookieParser(),

        // use postgres for passport session
        session({
            resave: true,
            saveUninitialized: true,
            store: new pgSession({
                pg : pg,
                conString : process.env.DATABASE_URL
            }),
            secret: process.env.COOKIE_SECRET,
            cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
        }),

        passport.initialize(),
        passport.session()
    ];

    // Serialize sessions
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, { raw: true })
            .then(user => done(null, user), err => done(err, null));
    });

    // Use local strategy to create user account
    passport.use('login', new LocalStrategy(function(username, password, done) {
        User.find({ where: { username } }).then(function(user) {
            if (!user) {
                done(null, false, { message: 'Unknown user' });
            } else if (!bcrypt.compareSync(password, user.password)) {
                done(null, false, { message: 'Invalid password'});
            } else {
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

    return middleware;
}

export function AUTHENTICATE(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(urlAppend('/admin/login', { returnUrl: req.originalUrl }));
    }
}

export function AUTHENTICATEJSON (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({
            message: "You are not authorized to see this resource"
        });
    }
};

export function attemptLogin({ success, fail }) {
    return [
        passport.authenticate('login', {
            failureRedirect: fail
        }),
        function (req, res) {
            if (req.query && req.query.returnUrl) {
                res.redirect(req.query.returnUrl);
            } else {
                res.redirect(success);
            }
        }
    ];
}

export function attemptRegister({ success, fail }) {
    return [
        passport.authenticate('register', {
            failureRedirect: fail
        }),
        function (req, res) {
            if (req.query && req.query.returnUrl) {
                res.redirect(req.query.returnUrl);
            } else {
                res.redirect(success);
            }
        }
    ];
}