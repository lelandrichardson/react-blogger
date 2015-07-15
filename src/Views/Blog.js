var React = require('react');
var Container = require('../Mixins/Container');
var { Link } = require('react-router');
var { timeAgo } = require('../Lib/formatDate');

var BlogStore = require('../Stores/BlogStore');

var Markdown = require('../Components/Markdown');
var BlogHeader = require('../Components/BlogHeader');
var Footer = require('../Components/Footer');
var Helmet = require('react-helmet');
var Loading = require('../Components/Loading');

if(__CLIENT__) require('../Styles/Blog.less');
class Blog extends React.Component {
    render() {
        const blog = this.props.blog;
        const body = blog.getIn(['publishedVersion', 'body']);
        return (
            <div>
                <Helmet
                    title={blog.get('title')}
                    meta={[
                        { "name": "description", "content": blog.get('summary') },
                        { "property": "og:type", "content": "article" }
                    ]}
                    />
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
        );
    }
}

module.exports = Container.create(Blog, ['BlogStore'], {
    getComponentProps([ BlogStore ], { params }) {
        return {
            blog: BlogStore.getFromSlug(params.slug)
        }
    },
    loadingComponent: <Loading />
});