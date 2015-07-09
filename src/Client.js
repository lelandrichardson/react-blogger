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
import BrowserHistory from 'react-router/lib/BrowserHistory';
var alt = require('./alt');

// Views
var Layout = require('./Views/Layout');
var Blog = require('./Views/Blog');

var routes = (
    <Route path="/">
        <Route path="" component={Layout} />
        <Route path=":slug" component={Blog} />
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
                <Route path="/" component={Layout} />
                <Route path="/:slug" component={Blog} />
            </Router>
        );
    }
}

// Mount the app
React.render(<App history={history} />, document.getElementById("mount"));

