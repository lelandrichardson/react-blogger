var BlogActions = require('../Actions/BlogActions');

export default class RouteStore {
    constructor() {
        this.bindListeners({
            afterCreateBlog: [
                BlogActions.CREATE_SUCCESS
            ],
            afterRemoveBlog: [
                BlogActions.REMOVE_SUCCESS
            ]
        })
    }

    afterCreateBlog({ id }) {
        alt.router.transitionTo(`/admin/edit/${id}`); // TODO: figure out way to get at alt
    }

    afterRemoveBlog({ id }) {
        alt.router.transitionTo('/admin/blogs/drafts');
    }
}