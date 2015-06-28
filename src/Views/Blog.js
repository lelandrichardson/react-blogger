var React = require('react');
var Container = require('../Mixins/Container');
var { RouteHandler, Link } = require('react-router');

var BlogStore = require('../Stores/BlogStore');

var Markdown = require('../Components/Markdown');
var DocumentTitle = require('react-document-title');
var Loading = require('../Components/Loading');

require('../Styles/Blog.less');
class Blog extends React.Component {
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

module.exports = Container.create(Blog, [BlogStore], {
    getComponentProps(props) {
        return {
            blog: BlogStore.getFromSlug(props.params.slug)
        }
    },
    loadingComponent: <Loading />
});