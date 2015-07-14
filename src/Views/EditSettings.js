var React = require('react');
var Container = require('../Mixins/Container');
var Icon = require('react-fontawesome');
var { Toolbar, ToolbarLink, ToolbarButton } = require('../Components/Toolbar');
var { autobind } = require('../Mixins/decorators');
var { is } = require('immutable');

/**
 * Blog Name
 * Tag Line
 * Author Name
 * Author Image Url
 * Google Analytics ID
 * Allow registration?
 */

class EditSettings extends React.Component {
    static getComponentProps([SettingsStore], { params }, { flux }) {
        return {
            settings: SettingsStore.all()
        };
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            settings: this.props.settings
        };
    }
    inputChangeFor(name) {
        return e => {
            this.setState({
                settings: this.state.settings.set(name, e.target.value)
            });
        };
    }

    @autobind
    onSaveClick() {

    }
    render() {
        const { settings } = this.state;
        const hasChanges = !is(this.state.settings, this.props.settings);
        return (
            <div className="blog-list">
                <Toolbar>
                    <ToolbarLink to="/admin/blogs/drafts">
                        <Icon name="arrow-left" /> Blogs
                    </ToolbarLink>
                </Toolbar>
                <div style={{ marginTop: 54, padding: 20 }}>

                    <label className="modal-input-label">Blog Name</label>
                    <input
                        type="text"
                        className="modal-input"
                        placeholder="Subtitle"
                        value={settings.get('name')}
                        onChange={this.inputChangeFor('name')} />

                    <label className="modal-input-label">Blog Summary</label>
                    <textarea
                        className="modal-textarea"
                        placeholder="Summary"
                        value={settings.get('summary')}
                        onChange={this.inputChangeFor('summary')}
                        maxLength={255} />

                    <div>
                        <button className="modal-button right" disabled={!hasChanges} onClick={this.onSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Container.create(EditSettings, ['SettingsStore'], {
    getComponentProps([SettingsStore], { params }, { flux }) {
        return {
            settings: SettingsStore.all()
        };
    }
});