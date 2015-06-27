var React = global.React = require('react');
var md2react = require('md2react');

require('../Styles/Markdown.less');
class Markdown extends React.Component {

    //static propTypes = {
    //    text: React.PropTypes.string.isRequired
    //}

    shouldComponentUpdate(next) {
        return this.props.text !== next.text;
    }

    render () {
        return <div className="markdown-body">{md2react(this.props.text)}</div>;
    }
}

module.exports = Markdown;