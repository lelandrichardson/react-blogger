// polyfills
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise');

// global styles
require('./Styles/Reset.less');
require('./Styles/Utility.less');
require('./Styles/Base.less');
require('./Styles/Pagination.less');

var React = require('react');
var Router = require('react-router');
var {
    DefaultRoute,
    Route
} = Router;

// Views
var Layout = require('./Views/Layout');
var Home = require('./Views/Home');
var Blog = require('./Views/Blog');

var routes = (
    <Route name="home" handler={Layout} path="/">
        <DefaultRoute handler={Home} />
        <Route name="detail" path="/:slug" handler={Blog} />
    </Route>
);

// Mount the app
Router.run(routes, function (Handler, state) {
    React.render(<Handler {...state} />, document.getElementById("mount"));
});
