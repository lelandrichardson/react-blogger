var React = require('react');
var Container = require('../Mixins/Container');
var SummaryStore = require('../Stores/SummaryStore');
var BlogActions = require('../Actions/BlogActions');
var BlogListItem = require('../Components/BlogListItem');
var { Toolbar, ToolbarLink, ToolbarButton } = require('../Components/Toolbar');
var { Tabs, Tab } = require('../Components/Tabs');

require('../Styles/BlogList.less');
class BlogList extends React.Component {
    handleCreateClick(e) {
        e.preventDefault();
        BlogActions.create({ });
    }
    render() {
        const { blogs, scope } = this.props;
        return (
            <div className="blog-list">
                <Toolbar>
                    <ToolbarButton onClick={::this.handleCreateClick}>Add New</ToolbarButton>
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
                    {blogs.map(blog =>
                        <BlogListItem key={blog.get('slug')} blog={blog} />
                    )}
                </div>
            </div>
        );
    }
}

module.exports = Container.create(BlogList, [SummaryStore], {
    getComponentProps(props) {
        return {
            blogs: SummaryStore.listAll({ scope: props.params.scope }, 0) || [],
            scope: props.params.scope
        };
    }
});