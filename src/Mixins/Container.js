var React = require('react');
//var FluxyMixin = require('alt/mixins/FluxyMixin');
var Subscribe = require('alt/mixins/Subscribe');

var Container = {
    create(Component, storeNames, spec) {
        return React.createClass({
            mixins: [spec],

            statics: {
                // for when you want to access the "pure" component, ie for testing
                Component,
                storeNames
            },

            contextTypes: {
                flux: React.PropTypes.object.isRequired
            },

            stores: [],

            componentDidMount() {
                Subscribe.create(this);
                this.stores.forEach(store => {
                    Subscribe.add(this, store, this.onChange);
                });
            },

            componentWillUnmount() {
                Subscribe.destroy(this);
            },

            getState(props) {
                var $props = this.getComponentProps(this.stores, props, this.context);
                var $prop;

                var $loaded = true;
                if (this.isLoading) {
                    $loaded = this.isLoading();
                } else {
                    for (var prop in $props) {
                        $prop = $props[prop];
                        if ($prop === null || $prop === undefined || typeof $prop.then === "function") {
                            $loaded = false;
                        }
                    }
                }

                return { $props, $loaded };
            },

            onChange() {
                this.setState(this.getState(this.props));
            },

            getInitialState() {
                this.stores = storeNames.map(name => this.context.flux.getStore(name));
                return this.getState(this.props);
            },

            componentWillReceiveProps(nextProps) {
                this.setState(this.getState(nextProps));
            },

            render() {
                if (!this.state.$loaded) {
                    if (this.renderLoading) {
                        return this.renderLoading();
                    } else if (this.loadingComponent) {
                        return this.loadingComponent;
                    } else {
                        return null; // don't render anything...
                    }
                }

                return (
                    <Component
                        flux={this.context.flux}
                        {...this.props}
                        {...this.state.$props}
                        />
                );
            }
        })
    }
};

module.exports = Container;