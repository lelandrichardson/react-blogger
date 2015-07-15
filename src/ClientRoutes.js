var React = require('react');
var { Route } = require('react-router');

// Views
var Layout = require('./Views/Layout');
var Home = require('./Views/Home');
var Blog = require('./Views/Blog');

export default (
    <Route component={Layout}>
        <Route path="/" component={Home} />
        <Route path="/:slug" component={Blog} />
    </Route>
);