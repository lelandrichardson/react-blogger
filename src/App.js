var React = require('react');
var { Router, Route } = require('react-router');
import FluxyTransition from './Mixins/AsyncFluxProps.js';
import SmoothTransition from './Components/SmoothTransition.js';

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
    }
    render() {
        if (__SERVER__) {
            return (
                <Router ref="router" {...this.props} >
                    <Route component={SmoothTransition}>
                        {this.props.children}
                    </Route>
                </Router>
            );
        }

        return (
            <Router ref="router" {...this.props}>
                <Route component={FluxyTransition} flux={this.props.flux}>
                    <Route component={SmoothTransition}>
                        {this.props.children}
                    </Route>
                </Route>
            </Router>
        );
    }
}