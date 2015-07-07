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
var BlogList = require('./Views/BlogList');
var Editor = require('./Views/Editor');
var Login = require('./Views/Login');
var Register = require('./Views/Register');

// Non-Component-Subscribable Stores
var RouteStore = require('./Stores/RouteStore');

var alt = require('./alt');

var routes = (
    <Route path="/admin">
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="edit/:id" component={Editor} />
        <Route path="blogs/:scope" component={BlogList} />
        <Route path="blogs/:scope/:page" component={BlogList} />
    </Route>
);

var history = new BrowserHistory();

class App extends React.Component {
    componentDidMount() {
        // HACK:
        // This is a hack-ish way to get access to the router.transitionTo(...) methods
        // from inside dispatch/action handlers. Would love to see a way to get rid of
        // this.
        alt.router = this.refs.router;
    }
    render() {
        return (
            <Router ref="router" location={this.props.location} history={this.props.history}>
                {this.props.children}
            </Router>
        );
    }
}
// Mount the app
React.render(<App history={history} children={routes} />, document.getElementById("mount"));