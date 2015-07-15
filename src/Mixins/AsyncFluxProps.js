import React from 'react';

function eachComponents(components, iterator) {
    for (var i = 0, l = components.length; i < l; i++) {
        if (typeof components[i] === 'object') {
            for (var key in components[i]) {
                iterator(components[i][key], i, key);
            }
        } else {
            iterator(components[i], i);
        }
    }
}

function filterAndFlattenComponents(components) {
    var flattened = [];
    eachComponents(components, function(Component) {
        if (Component && Component.loadProps)
            flattened.push(Component);
    });
    return flattened;
}

function arrayDiff(previous, next) {
    var diff = [];

    for (var i = 0, l = next.length; i < l; i++)
        if (previous.indexOf(next[i]) === -1)
            diff.push(next[i]);

    return diff;
}

function shallowEqual(a, b) {
    var key;
    var ka = 0;
    var kb = 0;

    for (key in a) {
        if (a.hasOwnProperty(key) && a[key] !== b[key])
            return false;
        ka++;
    }

    for (key in b)
        if (b.hasOwnProperty(key))
            kb++;

    return ka === kb;
}

var FluxyTransition = React.createClass({

    getInitialState() {
        return {
            loading: false,
            previousProps: null
        };
    },

    fetchData(components, params) {
        const flux = this.props.route.flux;
        this.setState({
            loading: true,
            previousProps: this.props
        },() => {
            flux.Http.start();
            // NOTE: if there is nested data loading, this will only pre-render one level...
            components.forEach(Component => Component.loadProps(params, flux));
            flux.Http.stop();
            Promise.all(flux.Http.promises).then(() => this.setState({ loading: false, previousProps: null }));
        });
    },

    componentDidMount() {
        var { components, params } = this.props;
        this.fetchData(filterAndFlattenComponents(components), params);
    },

    componentWillReceiveProps(nextProps) {
        var routerTransitioned = nextProps.location !== this.props.location;

        if (!routerTransitioned)
            return;

        var oldComponents = this.props.components;
        var newComponents = nextProps.components;

        var components = arrayDiff(
            filterAndFlattenComponents(oldComponents),
            filterAndFlattenComponents(newComponents)
        );

        if (components.length === 0)
            return;

        this.fetchData(components, nextProps.params);
    },

    render() {
        var { loading, previousProps } = this.state;

        if (loading && previousProps)
            return React.cloneElement(previousProps.children, { loading: true });

        else
            return this.props.children;
    }
});

export default FluxyTransition;