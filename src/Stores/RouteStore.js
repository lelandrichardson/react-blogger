var alt = require('../alt');
var BlogActions = require('../Actions/BlogActions');
var { handles } = require('../Mixins/alt-decorators');

class RouteStore {
    constructor(listeners) {
        this.bindListeners(listeners);
    }

    @handles(BlogActions.CREATE_SUCCESS)
    afterCreateBlog({ id }) {
        alt.router.transitionTo(`/admin/edit/${id}`)
    }

    @handles(BlogActions.REMOVE_SUCCESS)
    afterRemoveBlog({ id }) {
        alt.router.transitionTo('/admin/blogs/drafts');
    }
}

module.exports = alt.createStore(RouteStore, 'RouteStore', RouteStore.listeners);