// polyfills
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise');

// global styles
require('./Styles/Reset.less');
require('./Styles/Utility.less');
require('./Styles/Base.less');
require('./Styles/Pagination.less');

var React = require('react'); window.React = React; // enable debugger
var { Router } = require('react-router');
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Flux from './Flux';
import App from './App';

const flux = new Flux();
flux.bootstrap(window.__data__);

var AdminRoutes = require('./AdminRoutes');

var history = new BrowserHistory();

// Mount the app
React.render(<App flux={flux} history={history} children={AdminRoutes} />, document.getElementById("mount"));