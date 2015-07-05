var React = global.React = require('react');
var md2react = require('md2react');
// TODO: get highlighting working...
//var Highlight = require('babel!react-highlight');

const options = {
    gfm: true,
    footnotes: true,
    sanitize: false,
    //highlight: function (code, lang, key) {
    //    return (
    //        <Highlight
    //            key={key}
    //            className={lang}>{code}</Highlight>
    //    );
    //}
};

require('../Styles/Markdown.less');
class Markdown extends React.Component {

    //static propTypes = {
    //    text: React.PropTypes.string.isRequired
    //}

    shouldComponentUpdate(next) {
        return this.props.text !== next.text;
    }

    render () {
        return (
            <div className="markdown-body">
                {md2react(this.props.text || "", options)}
            </div>
        );
    }
}

module.exports = Markdown;