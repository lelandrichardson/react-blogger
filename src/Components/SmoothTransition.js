var React = require('react');

const loading = { transition: 'opacity 500ms ease 250ms', opacity: 0.5 };
const loaded = { transition: 'opacity 150ms', opacity: 1 };

export default class SmoothTransition {
    render() {
        return <div {...this.props} style={this.props.loading ? loading : loaded} />
    }
}