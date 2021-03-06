var React = require('react');
var Container = require('../Mixins/Container');

var { Toolbar, ToolbarButton, ToolbarLink, ToolbarText } = require('../Components/Toolbar');
var MarkdownEditor = require('../Components/MarkdownEditor');
var Modal = require('../Components/Modal');
var Helmet = require('react-helmet');
var Loading = require('../Components/Loading');
var Icon = require('react-fontawesome');
var Datepicker = require('react-datepicker/dist/react-datepicker');
var moment = require('moment');
var UrlSlugInput = require('../Components/UrlSlugInput');
var { timeAgo } = require('../Lib/formatDate');
var { is } = require('immutable');
var { autobind, debounce } = require('../Mixins/decorators');
import toSlug from '../Lib/toSlug.js';

const BODY = ['editingVersion','body'];

require('react-datepicker/dist/react-datepicker.css');
require('../Styles/Editor.less');
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: props.blog,
            needsSaving: false,
            showModal: false
        };
    }

    @autobind
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

    @autobind
    onSlugChange(e) {
        this.setState({
            blog: this.state.blog.merge({
                slugIsControlled: false,
                slug: toSlug(e.target.value)
            }),
            needsSaving: true
        });
    }

    @autobind
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

    @autobind
    onSlugIsControlledChange(e) {
        var blog = this.state.blog;
        var slugIsControlled = !!e.target.value;
        var slug = !slugIsControlled ? blog.get('slug') : toSlug(blog.get('title'));
        this.setState({
            blog: blog.merge({ slugIsControlled, slug })
        });
    }

    @autobind
    @debounce(2000)
    saveBody() {
        var { blog, needsSaving } = this.state;
        if (needsSaving) {
            this.props.BlogActions.update(blog.toJS())
        } else {
            this.props.BlogActions.updateBody(blog.get('id'), blog.getIn(BODY));
        }
    }

    @autobind
    onBodyChange(e) {
        this.setState({
            blog: this.state.blog.setIn(BODY, e.target.value)
        });
        this.saveBody();
    }

    @autobind
    onSaveClick(e) {
        e && e.preventDefault();
        this.props.BlogActions.update(this.state.blog.toJS());
        this.setState({ showModal: false });
    }

    @autobind
    onPublishClick(e) {
        e.preventDefault();
        this.props.BlogActions.publish(this.state.blog.get('id'));
    }

    @autobind
    onUnpublishClick(e) {
        e.preventDefault();
        this.props.BlogActions.unpublish(this.state.blog.get('id'));
    }

    @autobind
    onDeleteClick(e) {
        e.preventDefault();
        this.props.BlogActions.remove(this.state.blog.get('id'));
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
            <div>
                <Helmet title={blog.get('title') || '(Untitled)'} />
                <Toolbar>
                    <ToolbarLink to="/admin/blogs/drafts">
                        <Icon name="arrow-left" /> Blogs
                    </ToolbarLink>
                    {hasChanges &&
                    <ToolbarButton onClick={this.onSaveClick}>
                        <Icon name="floppy-o" /> Save
                    </ToolbarButton>}
                    {!published && !hasChanges &&
                    <ToolbarButton onClick={this.onPublishClick}>
                        <Icon name="bullhorn" /> Publish
                    </ToolbarButton>}
                    {published &&
                    <ToolbarButton onClick={this.onUnpublishClick}>
                        Unpublish
                    </ToolbarButton>}
                    {published &&
                    <ToolbarText>
                        Published {timeAgo(blog.get('datePublished'))}
                    </ToolbarText>}
                    {unpublishedChanges &&
                    <ToolbarButton onClick={this.onPublishClick}>
                        <Icon name="floppy-o" size="lg"/> Update
                    </ToolbarButton>}
                    <ToolbarButton onClick={this.onDeleteClick}>
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
                            onChange={this.onTitleChange} />
                    </div>
                    <MarkdownEditor
                        onChange={this.onBodyChange}
                        onSave={this.onSaveClick}
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
                            onChange={this.onTitleChange} />

                        <label className="modal-input-label">Subtitle</label>
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Subtitle"
                            value={blog.get('subtitle')}
                            onChange={this.inputChangeFor('subtitle')} />

                        <label className="modal-input-label">Blog Url Slug</label>
                        <UrlSlugInput
                            className="modal-input"
                            placeholder="Url Slug"
                            locked={blog.get('slugIsControlled')}
                            onLockChange={this.onSlugIsControlledChange}
                            value={blog.get('slug')}
                            onChange={this.onSlugChange} />

                        {published && <label className="modal-input-label">Publish Date</label>}
                        {published && <Datepicker
                            className="modal-input"
                            placeholderText="Publish Date"
                            dateFormat="YYYY/MM/DD"
                            selected={moment(blog.get('datePublished'))}
                            onChange={this.onPublishDateChange} />}

                        <label className="modal-input-label">Blog Summary</label>
                        <textarea
                            className="modal-textarea"
                            placeholder="Summary"
                            value={blog.get('summary')}
                            onChange={this.inputChangeFor('summary')}
                            maxLength={255} />

                        <button className="modal-button right" onClick={this.onSaveClick}>Save</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = Container.create(Editor, ['BlogStore'], {
    getComponentProps([ BlogStore ], { params }, { flux }) {
        return {
            BlogActions: flux.getActions('BlogActions'),
            blog: BlogStore.getFromId(+params.id)
        }
    }
});