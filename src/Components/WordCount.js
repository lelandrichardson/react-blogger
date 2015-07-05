var React = require('react');

function wordCount(text) {
    return text ? text.match(/\b\S+\b/g).length : 0;
}

class WordCount extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired
    };

    shouldComponentUpdate({ text }) {
        return this.props.text !== text;
    }

    render() {
        return (
            <span>{"" + wordCount(this.props.text)} words</span>
        );
    }
}

module.exports = WordCount;