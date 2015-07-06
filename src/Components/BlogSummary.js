var React = require('react');
var { Link } = require('react-router');
var { short } = require('../Lib/formatDate');

require('../Styles/BlogSummary.less');
class BlogSummary extends React.Component {
    render() {
        const blog = this.props.blog;
        return (
            <Link className="blog-summary" to={`/${blog.get('slug')}`}>
                <h3 className="blog-summary-title">{blog.get('title')}</h3>
                <div className="blog-summary-summary">{blog.get('summary')}</div>
                <div className="blog-summary-date">
                    {short(blog.get('datePublished'))}
                </div>
            </Link>
        );
    }
}

module.exports = BlogSummary;