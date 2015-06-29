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
    Route,
    Routes,
    DefaultRoute,
    HistoryLocation
    } = Router;

// Views
var Dashboard = require('./Views/Dashboard');
var BlogList = require('./Views/BlogList');
var Editor = require('./Views/Editor');

var routes = (
    <Route path="/admin" name="dashboard" handler={Dashboard}>
        <DefaultRoute handler={BlogList} />
        <Route name="new" path="create" handler={Editor} />
        <Route name="edit" path="edit/:id" handler={Editor} />
    </Route>
);

// Mount the app
Router.run(routes, HistoryLocation, function (Handler, state) {
    React.render(<Handler {...state} />, document.getElementById("mount"));
});

