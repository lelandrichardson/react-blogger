var React = require('react');
var CodeMirror;
//var ReactCodeMirror = require('react-codemirror');
var ReactCodeMirror = require('react-code-mirror');
var Markdown = require('./Markdown');
var WordCount = require('./WordCount');

if (__CLIENT__) {
    // codemirror javascript
    CodeMirror = require('codemirror');
    require('codemirror/mode/xml/xml');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/gfm/gfm');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/css/css');
    require('codemirror/mode/htmlmixed/htmlmixed');
}

function keymapFor(instance) {
    if (__SERVER__) {
        return {};
    } else {
        return CodeMirror.normalizeKeyMap({
            Enter: 'newlineAndIndentContinueMarkdownList',
            'Cmd-S': (cm) => {
                instance.props.onSave && instance.props.onSave();
            },
            'Ctrl-S': (cm) => {
                instance.props.onSave && instance.props.onSave();
            }
        });
    }
}

// Styles
require('../Styles/base16-light.less');
require('codemirror/lib/codemirror.css');
require('../Styles/MarkdownEditor.less');
class MarkdownEditor extends React.Component {
    render() {
        return (
            <div className="md-editor">
                <div className="md-editor-body">
                    <ReactCodeMirror
                        className="ReactCodeMirror"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        {...{
                            mode: 'gfm',
                            lineNumbers: true,
                            matchBrackets: true,
                            lineWrapping: true,
                            theme: 'base16-light',
                            extraKeys: keymapFor(this)
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