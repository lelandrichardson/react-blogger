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
var CreateBlog = require('./Views/CreateBlog');
var Login = require('./Views/Login');

// Non-Component-Subscribable Stores
var RouteStore = require('./Stores/RouteStore');

var alt = require('./alt');

var routes = (
    <Route path="/admin">
        <Route path="login" component={Login} />
        <Route path="create" component={CreateBlog} />
        <Route path="edit/:id" component={Editor} />
        <Route path="blogs/:scope" component={BlogList} />
    </Route>
);

var history = new BrowserHistory();

class App extends React.Component {
    componentDidMount() {
        //console.log(this.refs.router);
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



//history.addChangeListener(location => {
//    React.render(<Router location={location} history={history} />, document.getElementById("mount"));
//});

// Mount the app
React.render(<App history={history} children={routes} />, document.getElementById("mount"));
