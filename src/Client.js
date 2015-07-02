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
var {
    Router,
    Route,
    DefaultRoute,
    BrowserHistory
    } = require('react-router');

// Views
var Layout = require('./Views/Layout');
var Home = require('./Views/Home');
var Blog = require('./Views/Blog');

class App extends React.Component {
    constructor(props){
        super(props);
        this.history = new BrowserHistory();
    }
    render() {
        return (
            <Router history={this.history}>
                <Route name="home" handler={Layout} path="/">
                    <DefaultRoute handler={Home} />
                    <Route name="detail" path="/:slug" handler={Blog} />
                </Route>
            </Router>
        );
    }
}

// Mount the app
React.render(<App />, document.getElementById("mount"));

