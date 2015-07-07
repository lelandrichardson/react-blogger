var React = require('react');
var Container = require('../Mixins/Container');
var { RouteHandler, Link } = require('react-router');

var SummaryStore = require('../Stores/SummaryStore');

var BlogSummary = require('../Components/BlogSummary');
var Loading = require('../Components/Loading');
var InfiniteScroll = require('react-infinite-scroll');

class Home extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    render() {
        const { blogs, page } = this.props;
        return (
            <div>
                <ul>
                    {blogs.items.map(blog =>
                        <BlogSummary key={blog.get('slug')} blog={blog} />
                    )}
                </ul>
                <a onClick={() => this.context.router.transitionTo(`?page=${page+1}`)}>Load More...</a>
            </div>
        );
    }
}

module.exports = Container.create(Home, [SummaryStore], {
    getComponentProps({ params, location }) {
        const page = +(location.query && location.query.page) || 0;
        const filter = { scope: 'published' };
        SummaryStore.listAll(filter, page);
        return {
            page,
            blogs: SummaryStore.listFull(filter) || { items: [], total: 0 }
        };
    },
    loadingComponent: <Loading />
});