var React = require('react');
var Container = require('../Mixins/Container');
var { RouteHandler, Link } = require('react-router');

var SummaryStore = require('../Stores/SummaryStore');

var BlogSummary = require('../Components/BlogSummary');
var Loading = require('../Components/Loading');

class Home extends React.Component {
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

module.exports = Container.create(Home, [SummaryStore], {
    getComponentProps() {
        return {
            blogs: SummaryStore.getAll()
        };
    },
    loadingComponent: <Loading />
});