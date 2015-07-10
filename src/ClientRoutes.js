var React = require('react');
var { Route } = require('react-router');

// Views
var Layout = require('./Views/Layout');
var Blog = require('./Views/Blog');

export default (
    <Route>
        <Route path="/" component={Layout} />
        <Route path="/:slug" component={Blog} />
    </Route>
);