var React = require('react');
var Helmet = require('react-helmet');
var Container = require('../Mixins/Container');
var { Link } = require('react-router');
var { timeAgo, utc } = require('../Lib/formatDate');
var { List } = require('immutable');
var config = require('../../config');

var Markdown = require('../Components/Markdown');
var Header = require('../Components/Header');
var Footer = require('../Components/Footer');

require('../Styles/Blog.less');
class Blog extends React.Component {
    render() {
        const blog = this.props.blog;
        const body = blog.getIn(['publishedVersion', 'body']);
        const canonical = `/${blog.get('slug')}`;

        //TODO: construct from body instead of using title
        const description = blog.get('summary') || blog.get('title') || '';
        return (
            <div>
                <Helmet
                    title={blog.get('title')}
                    meta={[
                        { property: "keywords", content: config.keywords },
                        { name: "description", content: description },
                        { property: "og:description", content: description },
                        { property: "og:type", content: "article" },
                        { property: "og:article:author", content: "Leland Richardson" },
                        { property: "og:article:section", content: "Blog" },
                        { property: "og:article:published_time", content: utc(blog.get('datePublished')) },
                        { property: "og:article:tag", content: "" }, // TODO: blog tags
                    ]}
                    link={[
                        { rel: "canonical", href: canonical },
                    ]}
                    />
                <Header
                    title={blog.get('title')}
                    subtitle={blog.get('subtitle')}
                    pages={this.props.pages.items}
                    />
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

module.exports = Container.create(Blog, ['BlogStore', 'SummaryStore'], {
    getComponentProps([ BlogStore, SummaryStore ], { params }) {
        return {
            blog: BlogStore.getFromSlug(params.slug),
            pages: SummaryStore.listAll({ scope: "pages" }, 0) || { items: List(), total: 0 }
        }
    }
});