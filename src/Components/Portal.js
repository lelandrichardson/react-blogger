var React = require('react');

var Portal = React.createClass({
    render: () => null,
    portalElement: null,
    componentDidMount() {
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            document.body.appendChild(this.portalElement);
        }
        this.componentDidUpdate();
    },
    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    },
    componentDidUpdate() {
        React.render(<div {...this.props} />, this.portalElement);
    }
});

module.exports = Portal;