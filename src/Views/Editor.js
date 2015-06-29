var React = require('react');
var Container = require('../Mixins/Container');
var { RouteHandler, Link } = require('react-router');

var BlogStore = require('../Stores/BlogStore');

var Markdown = require('../Components/Markdown');
var DocumentTitle = require('react-document-title');
var Loading = require('../Components/Loading');

require('../Styles/Blog.less');
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: props.blog
        };
    }
    onTitleChange(e) {
        this.setState({
            blog: this.state.blog.set('title', e.target.value)
        });
    }
    onBodyChange(e) {
        this.setState({
            blog: this.state.blog.set('body', e.target.value)
        });
    }
    onSaveClick() {
        console.log("Saving!");
    }
    render() {
        const blog = this.state.blog;
        return (
            <DocumentTitle title={blog.get('title') || "(Untitled)"}>
                <div>
                    <div>
                        <input type="text" value={blog.get('title')} onChange={this.onTitleChange}/>
                    </div>
                    <textarea onChange={this.onBodyChange}>{blog.get('body')}</textarea>
                    <button onClick={this.onSaveClick}>Save</button>
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Container.create(Editor, [BlogStore], {
    getComponentProps(props) {
        var id = +props.params.id;
        return {
            blog: id ? BlogStore.getFromId(id) : BlogStore.getNew()
        }
    },
    loadingComponent: <Loading />
});