var React = require('react');
var escape = require('lodash/string/escape');
var AsyncHighlighter = require('../Lib/AsyncHighlighter');

var marked = require('marked');
var renderer = new marked.Renderer();

renderer.code = function (code, lang) {
    return `<pre class="hljs"><code>${AsyncHighlighter.highlight(code)}</code></pre>`;
};

marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

require('../Styles/Markdown.less');
require('highlight.js/styles/darkula.css');
class Markdown extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired
    }

    constructor() {
        super();
        this.update = this.update.bind(this);
    }

    shouldComponentUpdate(next) {
        return this.props.text !== next.text;
    }

    componentDidMount() {
        AsyncHighlighter.on(this.update);
    }

    componentWillUnmount() {
        AsyncHighlighter.off(this.update);
    }

    update() {
        this.forceUpdate();
    }

    render () {
        const __html = marked(this.props.text);
        return (
            <div ref="container" className="markdown-body" dangerouslySetInnerHTML={{ __html }} />
        );
    }
}

module.exports = Markdown;