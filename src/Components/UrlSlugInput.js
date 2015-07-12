var React = require('react');
var Icon = require('react-fontawesome');
var { autobind } = require('../Mixins/decorators');

export default class UrlSlugInput extends React.Component {
    @autobind
    onLockClick() {
        this.props.onLockChange({ target: { value: !this.props.locked }});
    }
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <a style={{ position: 'absolute', right: 0, top: 0, padding: 10, display: 'inline-block' }} onClick={this.onLockClick}>
                    <Icon name={this.props.locked ? "lock" : "unlock"} />
                </a>
                <input
                    type="text"
                    className={this.props.className}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange} />
            </div>
        );
    }
}