var React = require('react');
var { Router } = require('react-router');

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
        return (
            <Router ref="router" {...this.props} />
        );
        //return (
        //    <Router ref="router" {...this.props} createElement={AsyncProps.createElement}>
        //        <Route component={AsyncProps}>
        //            {this.props.children}
        //        </Route>
        //    </Router>
        //);
    }
}