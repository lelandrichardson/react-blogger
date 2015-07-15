var React = require('react');
var Container = require('../Mixins/Container');
var { Link } = require('react-router');
var { List } = require('immutable');

var BlogSummary = require('../Components/BlogSummary');
var Loading = require('../Components/Loading');
var InfiniteScroll = require('../Components/InfiniteScroll');
var Helmet = require('react-helmet');

var { autobind } = require('../Mixins/decorators');

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: props.initialPage
        };
    }

    @autobind
    onLoadMore() {
        this.props.SummaryStore.listAll(this.props.filter, this.state.page + 1);
        this.setState({
            page: this.state.page + 1
        });
    }

    render() {
        const { blogs } = this.props;
        const hasMore = blogs.items.size < blogs.total;
        const isLoading = this.state.page * 10 > blogs.items.size;
        return (
            <div>
                <Helmet
                    title={'Intelligible Babble'}
                    meta={[
                        { name: "description", content: "Intelligible Babble" },
                        { property: "og:type", content: "article" }
                    ]}
                    />
                <InfiniteScroll
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={this.onLoadMore}
                    >
                    <ul>
                        {blogs.items.map(blog =>
                            <BlogSummary key={blog.get('slug')} blog={blog} />
                        )}
                    </ul>
                </InfiniteScroll>
                <div style={{ textAlign: 'center' }}>
                    {isLoading && "Loading..."}
                    {hasMore && <Link to={`?page=${this.state.page+1}`}>Load More...</Link>}
                </div>
            </div>
        );
    }
}

module.exports = Container.create(Home, ['SummaryStore'], {
    getComponentProps([ SummaryStore ], { location }) {
        const initialPage = +(location.query && location.query.page) || 0;
        const filter = { scope: 'published' };
        SummaryStore.listAll(filter, initialPage);
        return {
            SummaryStore,
            initialPage,
            filter,
            blogs: SummaryStore.listFull(filter) || { items: List(), total: 0 }
        };
    },
    loadingComponent: <Loading />
});