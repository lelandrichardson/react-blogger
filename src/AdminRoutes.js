var React = require('react');
var { Route } = require('react-router');

// Views
var BlogList = require('./Views/BlogList');
var Editor = require('./Views/Editor');
var Login = require('./Views/Login');
var Register = require('./Views/Register');

export default (
    <Route path="/admin">
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="edit/:id" component={Editor} />
        <Route path="blogs/:scope" component={BlogList} />
        <Route path="blogs/:scope/:page" component={BlogList} />
    </Route>
);