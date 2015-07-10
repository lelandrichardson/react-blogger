var React = require('react');
var CodeMirror = require('codemirror');
var ReactCodeMirror = require('react-codemirror');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
var Markdown = require('./Markdown');
var WordCount = require('./WordCount');

const extraKeys = CodeMirror.normalizeKeyMap({
    Enter: 'newlineAndIndentContinueMarkdownList',
    'Cmd-S': function (cm) {
        console.log("ctrl-s");
        return CodeMirror.Pass;
    }
});

const options = {
    mode: 'gfm',
    lineNumbers: true,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'base16-light',
    extraKeys
};

var noptions = {
    mode: 'gfm',
    lineNumbers: true,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'base16-light',
    extraKeys: CodeMirror.normalizeKeyMap({
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Cmd-S Ctrl-S': (cm) => {
            console.log("ctrl-s");
            this.props.onSave && this.props.onSave();
            //return CodeMirror.Pass;
        }
    })
};

if (__CLIENT__) require('../Styles/base16-light.less');
if (__CLIENT__) require('codemirror/lib/codemirror.css');
if (__CLIENT__) require('../Styles/MarkdownEditor.less');
class MarkdownEditor extends React.Component {
    render() {
        return (
            <div className="md-editor">
                <div className="md-editor-body">
                    <ReactCodeMirror
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={{
                            mode: 'gfm',
                            lineNumbers: true,
                            matchBrackets: true,
                            lineWrapping: true,
                            theme: 'base16-light',
                            extraKeys: CodeMirror.normalizeKeyMap({
                                Enter: 'newlineAndIndentContinueMarkdownList',
                                'Cmd-S': (cm) => {
                                    this.props.onSave && this.props.onSave();
                                },
                                'Ctrl-S': (cm) => {
                                    this.props.onSave && this.props.onSave();
                                }
                            })
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