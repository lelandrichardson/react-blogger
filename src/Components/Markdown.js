var React = require('react');
//var md2react = require('md2react');
var hl = require('highlight.js');


var marked = require('marked');
var renderer = new marked.Renderer();

//renderer.heading = function (text, level) {
//    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
//
//    return `<h${level} id="${escapedText}">${text}</h${level}`;
//};

renderer.code = function (code, lang) {
    return `<pre class="hljs"><code>${hl.highlightAuto(code).value}</code></pre>`;
};

marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

if (__CLIENT__) require('../Styles/Markdown.less');
//if (__CLIENT__) require('highlight.js/styles/default.css');
if (__CLIENT__) require('highlight.js/styles/darkula.css');
class Markdown extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired
    }

    shouldComponentUpdate(next) {
        return this.props.text !== next.text;
    }

    render () {
        const __html = marked(this.props.text);
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html }} />
        );
    }
}

module.exports = Markdown;