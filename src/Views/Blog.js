var React = require('react');
var Container = require('../Mixins/Container');
var { Link } = require('react-router');
var { timeAgo } = require('../Lib/formatDate');

var BlogStore = require('../Stores/BlogStore');

var Markdown = require('../Components/Markdown');
var BlogHeader = require('../Components/BlogHeader');
var Footer = require('../Components/Footer');
var DocumentTitle = require('react-document-title');
var Loading = require('../Components/Loading');

require('../Styles/Blog.less');
class Blog extends React.Component {
    render() {
        const blog = this.props.blog;
        const body = blog.getIn(['publishedVersion', 'body']);
        return (
            <DocumentTitle title={blog.get('title')}>
                <div>
                    <BlogHeader title={blog.get('title')} subtitle={blog.get('subtitle')} />
                    <div className="container">
                        <div className="blog-date">
                            {timeAgo(blog.get('datePublished'))}
                        </div>
                        <div className="blog">
                            <Markdown text={body} />
                        </div>
                    </div>
                    <Footer />
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