var React = require('react');
var FluxyMixin = require('alt/mixins/FluxyMixin');

var Container = {
    create(Component, storeListeners, spec) {
        return React.createClass({
            mixins: [
                FluxyMixin,
                spec
            ],

            statics: {
                // for when you want to access the "pure" component, ie for testing
                Component,
                storeListeners
            },

            getState(props) {
                var $props = this.getComponentProps(props);
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
                return this.getState(this.props);
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
                        {...this.props}
                        {...this.state.$props}
                        />
                );
            }
        })
    }
};

module.exports = Container;