var React = require('react');
var Container = require('../Mixins/Container');

var BlogStore = require('../Stores/BlogStore');
var BlogActions = require('../Actions/BlogActions');

var { Toolbar, ToolbarButton, ToolbarLink, ToolbarText } = require('../Components/Toolbar');
var MarkdownEditor = require('../Components/MarkdownEditor');
var Modal = require('../Components/Modal');
var DocumentTitle = require('react-document-title');
var Loading = require('../Components/Loading');
var Icon = require('react-fontawesome');
require('react-datepicker/dist/react-datepicker.css');
var Datepicker = require('react-datepicker/dist/react-datepicker');
var moment = require('moment');
var key = require('keymaster');
var debounce = require('lodash/function/debounce');
var { timeAgo } = require('../Lib/formatDate');
var { is } = require('immutable');

const BODY = ['editingVersion','body'];

//TODO: move to separate module
const remHyphenRegex = /( ?- ?)|[ ']/g;
const remRegex = /[^0-9a-zA-Z-]/g;
function toSlug(title) {
    return title.replace(remHyphenRegex, "-").replace(remRegex, "").trim().toLowerCase();
}

if(__CLIENT__) require('../Styles/Editor.less');
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: props.blog,
            needsSaving: false,
            showModal: false
        };
        this.saveBody = debounce(this.saveBody, 2000);
    }
    onTitleChange(e) {
        const blog = this.state.blog;
        const title = e.target.value;
        const slugIsControlled = blog.get('slugIsControlled');
        const slug = slugIsControlled ? toSlug(title) : blog.get('slug');

        this.setState({
            blog: blog.merge({ title, slug }),
            needsSaving: true
        });
    }
    onSlugChange(e) {
        this.setState({
            blog: this.state.blog.merge({
                slugIsControlled: false,
                slug: toSlug(e.target.value)
            }),
            needsSaving: true
        });
    }
    onPublishDateChange(changed) {
        this.setState({
            blog: this.state.blog.set('datePublished', changed.toDate()),
            needsSaving: true
        });
    }
    inputChangeFor(prop) {
        return e => {
            const blog = this.state.blog.set(prop, e.target.value);
            this.setState({
                blog,
                needsSaving: !is(blog, this.state.blog)
            });
        };
    }
    saveBody() {
        var { blog, needsSaving } = this.state;
        if (needsSaving) {
            BlogActions.update(blog.toJS())
        } else {
            BlogActions.updateBody(blog.get('id'), blog.getIn(BODY));
        }
    }
    onBodyChange(body) {
        this.setState({
            blog: this.state.blog.setIn(BODY, body)
        });
        this.saveBody();
    }
    onSaveClick(e) {
        e && e.preventDefault();
        BlogActions.update(this.state.blog.toJS());
        this.setState({ showModal: false });
    }
    onPublishClick(e) {
        e.preventDefault();
        BlogActions.publish(this.state.blog.get('id'));
    }
    onUnpublishClick(e) {
        e.preventDefault();
        BlogActions.unpublish(this.state.blog.get('id'));
    }
    onDeleteClick(e) {
        e.preventDefault();
        BlogActions.remove(this.state.blog.get('id'));
    }
    componentDidMount() {
        key('ctrl+s, ⌘+s', e => this.onSaveClick(e));
    }
    componentWillUnmount() {
        key.unbind('ctrl+s, ⌘+s');
    }
    componentWillReceiveProps({ blog }) {
        const current = this.state.blog;
        const currentBody = current.get(BODY);

        // we want to handle high-frequency changes with the
        // body... so we are going to treat the body separately.
        if (blog.get('id') === current.get('id') && currentBody !== undefined) {
           blog = blog.set(BODY, currentBody);
        }

        this.setState({ blog, needsSaving: false });
    }
    render() {
        const blog = this.state.blog;
        const hasChanges = blog !== this.props.blog;
        const published = !!blog.get('datePublished');
        const unpublishedChanges = published && blog.get('editingVersionId') !== blog.get('publishedVersionId');
        const body = blog.getIn(BODY);
        return (
            <DocumentTitle title={blog.get('title') || '(Untitled)'}>
                <div>
                    <Toolbar>
                        <ToolbarLink to="/admin/blogs/drafts">
                            <Icon name="arrow-left" /> Blogs
                        </ToolbarLink>
                        {hasChanges &&
                        <ToolbarButton onClick={::this.onSaveClick}>
                            <Icon name="floppy-o" /> Save
                        </ToolbarButton>}
                        {!published && !hasChanges &&
                        <ToolbarButton onClick={::this.onPublishClick}>
                            <Icon name="bullhorn" /> Publish
                        </ToolbarButton>}
                        {published &&
                        <ToolbarButton onClick={::this.onUnpublishClick}>
                            Unpublish
                        </ToolbarButton>}
                        {published &&
                        <ToolbarText>
                            Published {timeAgo(blog.get('datePublished'))}
                        </ToolbarText>}
                        {unpublishedChanges &&
                        <ToolbarButton onClick={::this.onPublishClick}>
                            <Icon name="floppy-o" size="lg"/> Update
                        </ToolbarButton>}
                        <ToolbarButton onClick={::this.onDeleteClick}>
                            <Icon name="trash-o" /> Delete
                        </ToolbarButton>
                        <ToolbarButton className="right" onClick={() => this.setState({ showModal: true })}>
                            <Icon name="cog" size="lg"/>
                        </ToolbarButton>
                    </Toolbar>
                    <div className="editor">
                        <div className="editor-title-box">
                            <input
                                className="editor-title-input"
                                type="text"
                                placeholder="Blog Title"
                                value={blog.get('title')}
                                onChange={::this.onTitleChange} />
                        </div>
                        <MarkdownEditor
                            onChange={::this.onBodyChange}
                            onSave={::this.onSaveClick}
                            value={body}
                            hasChanges={hasChanges}
                            />
                    </div>
                    <Modal visible={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                        <div>

                            <label className="modal-input-label">Page Type</label>
                            <label className="modal-radio-label">
                                <input
                                    type="radio"
                                    value="blog"
                                    checked={blog.get('type') === 'blog'}
                                    onChange={this.inputChangeFor('type')}
                                    />
                                Blog
                            </label>
                            <label className="modal-radio-label">
                                <input
                                    type="radio"
                                    value="page"
                                    checked={blog.get('type') === 'page'}
                                    onChange={this.inputChangeFor('type')}
                                    />
                                Page
                            </label>

                            <label className="modal-input-label">Title</label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Summary"
                                value={blog.get('title')}
                                onChange={::this.onTitleChange} />

                            <label className="modal-input-label">Subtitle</label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Subtitle"
                                value={blog.get('subtitle')}
                                onChange={this.inputChangeFor('subtitle')} />

                            <label className="modal-input-label">Blog Url Slug</label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Url Slug"
                                value={blog.get('slug')}
                                onChange={::this.onSlugChange} />

                            {published && <label className="modal-input-label">Publish Date</label>}
                            {published && <Datepicker
                                className="modal-input"
                                placeholderText="Publish Date"
                                dateFormat="YYYY/MM/DD"
                                selected={moment(blog.get('datePublished'))}
                                onChange={::this.onPublishDateChange} />}

                            <label className="modal-input-label">Blog Summary</label>
                            <textarea
                                className="modal-textarea"
                                placeholder="Summary"
                                value={blog.get('summary')}
                                onChange={this.inputChangeFor('summary')}
                                maxLength={255} />

                            <button className="modal-button right" onClick={::this.onSaveClick}>Save</button>
                        </div>
                    </Modal>
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Container.create(Editor, [BlogStore], {
    getComponentProps(props) {
        return {
            blog: BlogStore.getFromId(+props.params.id)
        }
    },
    loadingComponent: <Loading />
});