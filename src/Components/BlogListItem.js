var React = require('react');
var { Link } = require('react-router');
var { timeAgo } = require('../Lib/formatDate');

if (__CLIENT__) require('../Styles/BlogListItem.less');
class BlogListItem extends React.Component {
    render() {
        const blog = this.props.blog;
        const published = !!blog.get('datePublished');
        return (
            <Link className="blog-list-item" to={`/admin/edit/${blog.get('id')}`}>
                <h3 className="blog-list-item-title">{blog.get('title') || '(Untitled)'}</h3>
                <div className="blog-list-item-summary">{blog.get('summary')}</div>
                <div className="blog-list-item-date">
                    {published && (<span>Published {timeAgo(blog.get('datePublished'))}</span>)}
                    {published && (<span> | </span>)}
                    <span>Updated {timeAgo(blog.get('updatedAt'))}</span>
                </div>
            </Link>
        );
    }
}

module.exports = BlogListItem;