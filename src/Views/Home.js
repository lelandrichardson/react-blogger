var React = require('react');
var connectToStores = require('alt/utils/connectToStores');
var { RouteHandler, Link } = require('react-router');

var SummaryStore = require('../Stores/SummaryStore');

var BlogSummary = require('../Components/BlogSummary');


@connectToStores
class Home extends React.Component {

    static getStores() { return [SummaryStore] }

    static getPropsFromStores() { return { blogs: SummaryStore.getAll() }}

    render() {
        return (
            <ul>
                {this.props.blogs.map(blog =>
                    <BlogSummary key={blog.get('slug')} blog={blog} />
                )}
            </ul>
        );
    }
}

module.exports = Home;