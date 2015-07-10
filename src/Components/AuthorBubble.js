var React = require('react');

if (__CLIENT__) require('../Styles/AuthorBubble.less');
class AuthorBubble extends React.Component {
    render() {
        const size = this.props.size;
        const src = `//www.gravatar.com/avatar/d17c2bfd583ad8587ab2392c0a41ea78.png?s=${size}`;
        return (
            <div className="author-bubble">
                <img className="author-bubble-img" src={src} width={size} height={size} />
                <div className="author-bubble-name">{this.props.name}</div>
            </div>
        );
    }
}

module.exports = AuthorBubble;