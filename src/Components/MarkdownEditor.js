var React = require('react');
var CodeMirror = require('react-codemirror');
var Markdown = require('./Markdown');
var WordCount = require('./WordCount');

require('../Styles/base16-light.less');
require('codemirror/lib/codemirror.css');
require('../Styles/MarkdownEditor.less');
class MarkdownEditor extends React.Component {
    render() {
        return (
            <div className="md-editor">
                <div className="md-editor-body">
                    <CodeMirror
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={{
                            mode: 'gfm',
                            lineNumbers: true,
                            matchBrackets: true,
                            lineWrapping: true,
                            theme: 'base16-light',
                            extraKeys: {
                                Enter: 'newlineAndIndentContinueMarkdownList'
                            }
                        }}
                    />
                </div>
                <div className="md-editor-preview">
                    <div className="md-editor-floating-header">
                        <div className="left">
                            {this.props.hasChanges ? 'Needs Saving!' : '(Saved)'}
                        </div>
                        <div className="right">
                            <WordCount text={this.props.value} />
                        </div>
                    </div>
                    <div className="md-editor-preview-content">
                        <Markdown text={this.props.value} />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = MarkdownEditor;