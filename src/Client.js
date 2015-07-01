// polyfills
import 'es5-shim'
import 'es5-shim/es5-sham'
import 'es6-promise'

// global styles
import './Styles/Reset.less'
import './Styles/Utility.less'
import './Styles/Base.less'
import './Styles/Pagination.less'

import * as redux from './redux'

import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'

import { Redirect, Router, Route, DefaultRoute } from 'react-router'

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
            <Provider redux={redux}>
                <Router history={this.history}>
                    <Route name="home" handler={Layout} path="/">
                        <DefaultRoute handler={Home} />
                        <Route name="detail" path="/:slug" handler={Blog} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

// Mount the app
React.render(<App />, document.getElementById("mount"));

