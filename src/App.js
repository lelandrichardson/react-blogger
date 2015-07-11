var React = require('react');
var { Router, Route } = require('react-router');
//import AsyncProps from 'react-router/modules/experimental/AsyncProps';
import FluxyTransition from './Mixins/AsyncFluxProps.js';

function makeElementCreator(alt) {
    return function createElement(Component, state) {

    }
}

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
                <Router ref="router" {...this.props} />
            );
        }

        return (
            <Router ref="router" {...this.props}>
                <Route component={FluxyTransition} flux={this.props.flux}>
                    {this.props.children}
                </Route>
            </Router>
        );
    }
}