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
var { Router, Route } = require('react-router');
var { BrowserHistory } = require('react-router/lib/BrowserHistory');



// Views
var Dashboard = require('./Views/Dashboard');
var BlogList = require('./Views/BlogList');
var Editor = require('./Views/Editor');

//class App extends React.Component {
//    constructor(props){
//        super(props);
//    }
//    render() {
//        return (
//            <Router history={history}>
//                <Route path="/admin" name="dashboard" handler={Dashboard}>
//                    <DefaultRoute handler={BlogList} />
//                    <Route name="new" path="create" handler={Editor} />
//                    <Route name="edit" path="edit/:id" handler={Editor} />
//                </Route>
//            </Router>
//        );
//    }
//}

var routes = (
    <Router history={new BrowserHistory()}>
        <Route path="/admin"  component={Dashboard}>
            <Route path="create"  component={Editor} />
            <Route path="edit/:id" component={Editor} />
        </Route>
    </Router>
);

// Mount the app
React.render(routes, document.getElementById("mount"));