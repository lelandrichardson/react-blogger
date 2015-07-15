var React = require('react');
var { Router, Route } = require('react-router');
var ga = require('react-ga');
import FluxyTransition from './Mixins/AsyncFluxProps.js';
import SmoothTransition from './Components/SmoothTransition.js';
import { autobind } from './Mixins/decorators.js';

export default class App extends React.Component {
    static childContextTypes = {
        flux: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            flux: this.props.flux
        };
    }

    componentDidMount() {
        // HACK:
        // This is a hack-ish way to get access to the router.transitionTo(...) methods
        // from inside dispatch/action handlers. Would love to see a way to get rid of
        // this.
        this.props.flux.router = this.refs.router;
        if(__CLIENT__) {
            ga.initialize(process.env.GA_TRACKING_ID);
            this.onUpdate();
        }
    }

    @autobind
    onUpdate() {
        if(__CLIENT__) {
            const location = this.props.history.location;
            ga.pageview(location.pathname);
        }
    }

    render() {
        if (__SERVER__) {
            return (
                <Router ref="router" {...this.props} onUpdate={this.onUpdate}>
                    <Route component={SmoothTransition}>
                        {this.props.children}
                    </Route>
                </Router>
            );
        }

        return (
            <Router ref="router" {...this.props} onUpdate={this.onUpdate}>
                <Route component={FluxyTransition} flux={this.props.flux}>
                    <Route component={SmoothTransition}>
                        {this.props.children}
                    </Route>
                </Route>
            </Router>
        );
    }
}