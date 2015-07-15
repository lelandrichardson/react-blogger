var React = require('react');
var Container = require('../Mixins/Container');
var BlogActions = require('../Actions/BlogActions');
var BlogListItem = require('../Components/BlogListItem');
var Icon = require('react-fontawesome');
var { Toolbar, ToolbarLink, ToolbarButton } = require('../Components/Toolbar');
var { Tabs, Tab } = require('../Components/Tabs');
var Pager = require('react-pager');
var { autobind } = require('../Mixins/decorators');

require('../Styles/BlogList.less');
class BlogList extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    @autobind
    handleCreateClick(e) {
        e.preventDefault();
        this.props.BlogActions.create({ });
    }
    render() {
        const { blogs, scope, page } = this.props;
        return (
            <div className="blog-list">
                <Toolbar>
                    <ToolbarButton onClick={this.handleCreateClick}><Icon name="plus" /> Add New</ToolbarButton>
                    <ToolbarLink to="/admin/settings" className="right">
                        <Icon name="settings" /> Settings
                    </ToolbarLink>
                </Toolbar>
                <div style={{ marginTop: 54, padding: 20 }}>
                    <h1 className="blog-list-title">Your Posts</h1>
                    <Tabs>
                        <Tab active={scope === "drafts"} to="/admin/blogs/drafts">Drafts</Tab>
                        <Tab active={scope === "published"} to="/admin/blogs/published">Published</Tab>
                        <Tab active={scope === "pages"} to="/admin/blogs/pages">Pages</Tab>
                    </Tabs>
                </div>
                <div>
                    {blogs.items.map(blog =>
                        <BlogListItem key={blog.get('slug')} blog={blog} />
                    )}
                </div>
                <Pager
                    total={Math.ceil(blogs.total/10)}
                    current={page-1}
                    visiblePages={3}
                    onPageChanged={next => this.context.router.transitionTo(`/admin/blogs/${scope}/${next+1}`)}
                    />
            </div>
        );
    }
}

module.exports = Container.create(BlogList, ['SummaryStore'], {
    getComponentProps([SummaryStore], { params }, { flux }) {
        const page = +params.page || 1;
        const scope = params.scope;
        return {
            page,
            scope,
            BlogActions: flux.getActions('BlogActions'),
            blogs: SummaryStore.listAll({ scope }, page-1) || { items: [], total: 0 }
        };
    }
});