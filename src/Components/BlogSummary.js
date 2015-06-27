var React = require('react');
var { Link } = require('react-router');

class BlogSummary extends React.Component {
    render() {
        const blog = this.props.blog;
        return (
            <div>
                <h3>
                    <Link to={`/${blog.get('slug')}`}>{blog.get('title')}</Link>
                </h3>
                <div>{blog.get('summary')}</div>
            </div>
        )
    }
}

module.exports = BlogSummary;