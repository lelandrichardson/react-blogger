var React = require('react');
var connectToStores = require('alt/utils/connectToStores');
var { RouteHandler, Link } = require('react-router');

var BlogStore = require('../Stores/BlogStore');

var Markdown = require('../Components/Markdown');
var DocumentTitle = require('react-document-title');

require('../Styles/Blog.less');
@connectToStores
class Blog extends React.Component {
    static getStores() { return [BlogStore]; }

    static getPropsFromStores(props) {
        return {
            blog: BlogStore.getFromSlug(props.params.slug)
        };
    }

    render() {
        const blog = this.props.blog;
        return (
            <DocumentTitle title={blog.get('title')}>
                <div className="blog">
                    <h1 className="blog-title">{blog.get('title')}</h1>
                    <Markdown text={blog.get('body')} />
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Blog;