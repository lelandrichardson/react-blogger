var React = require('react');
var { Route } = require('react-router');

// Views
var Layout = require('./Views/Layout');
var Blog = require('./Views/Blog');

function onEnter(nextState, transition, callback) {
    console.log(nextState);
    console.log(transition);
    console.log(callback);
    //this.component
    callback(null, {});
}

export default (
    <Route>
        <Route path="/" component={Layout} />
        <Route path="/:slug" component={Blog} />
    </Route>
);