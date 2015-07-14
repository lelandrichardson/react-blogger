// polyfill
require('es6-shim');

// load environment variables into `process.env`
require('dotenv').config({ silent: true });

// site-wide config
var config = require('../config');

// modules
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var helmet = require('helmet');
var favicon = require('serve-favicon');


import { security, AUTHENTICATE, attemptLogin, attemptRegister } from './Server/security.js';
import { db } from './Server/database.js';
import Flux from './Flux.js';
const ClientRoutes = require('./ClientRoutes');
const AdminRoutes = require('./AdminRoutes');
import App from './App';

db.sync();

express.response.error = function(code, error) {
    if (typeof code !== 'number') {
        error = code;
        code = 500;
    }

    var message = typeof error !== 'string' ? (error.message || error.msg || error.error) : error;


    return this.status(code).json({
        message,
        code,
        stack: error.stack
    });
};

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
app.use(security(config));

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

app.post('/admin/login', ...attemptLogin({ success: '/admin/blogs/drafts', fail: '/admin/login'}));

app.post('/admin/register', ...attemptRegister({ success: '/admin/blogs/drafts', fail: '/admin/login'}));

app.use('/admin/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.use('/api', AUTHENTICATE, require('./Server/Api'));

// login/register pages
app.get(['/admin/login', '/admin/register'], function (req, res) {
    const flux = new Flux({ req });
    flux.render(AdminRoutes, App).then(
        ({ html, data }) => res.render('Admin', { html, data }),
        error => res.error(error)
    );
});

// all admin pages
app.use(['/admin','/admin/*'], AUTHENTICATE, function (req, res) {
    const flux = new Flux({ req });
    flux.render(AdminRoutes, App).then(
        ({ html, data }) => res.render('Admin', { html, data }),
        error => res.error(error)
    );
});

// all client/public pages
app.use('/*', function (req, res) {
    const flux = new Flux({ req });
    flux.render(ClientRoutes, App).then(
        ({ html, data }) => res.render('Client', { html, data }),
        error => res.error(error)
    );
});

// Start the app by listening on <port>
app.listen(process.env.PORT || 3030);

// Expose app
module.exports = app;