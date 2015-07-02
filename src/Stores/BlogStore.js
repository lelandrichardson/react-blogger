var { Map, List, fromJS } = require('immutable');
var EntityStore = require('../Mixins/EntityStore');
var alt = require('../alt');
var Api = require('../Lib/Api');
var BlogActions = require('../Actions/BlogActions');

// ALTJS:
// it would make sense for the concept of a "data source" to
// also control the "Actions" corresponding to those methods,
// and thus be referenced by other stores, but not need to create
// the actions separately, specify them here, and then handle the
// standard case in the store instance.
const BlogDataSource = alt => ({
    getFromId: {
        remote(store, id) {
            return Api.blog.get(id);
        },
        local(store, id) {
            return store.state && store.state.get(id);
        },
        loading: BlogActions.getFromId,
        success: BlogActions.getFromIdSuccess,
        error: BlogActions.getFromIdError
    },
    getFromSlug: {
        remote(store, slug) {
            return Api.blog.getFromSlug(slug);
        },
        local(store, slug) {
            var id = store.slugToId.get(slug);
            return store.state.get(id);
        },
        loading: BlogActions.getFromSlug,
        success: BlogActions.getFromSlugSuccess,
        error: BlogActions.getFromSlugError
    }
});

class BlogStore extends EntityStore {
    constructor() {
        super();
        // TODO:
        // make entity store handle multiple keys (ie, "id" and "slug")
        // and correspondingly make a smarter `this.addEntity()` method...
        this.slugToId = Map(); // slug => id
        this.registerDataSource(BlogDataSource);
        this.bindListeners({
            handleBlog: [
                BlogActions.GET_FROM_ID_SUCCESS,
                BlogActions.GET_FROM_SLUG_SUCCESS,
                BlogActions.UPDATE_SUCCESS
            ]
        });
    }

    handleBlog(blog) {
        //debugger;
        this.getInstance().slugToId = this.slugToId.set(blog.slug, blog.id);
        this.set(blog.id, blog);
    }

    static getNew() {
        return Map();
    }
}

BlogStore.config = {
    getState() { return this; }
};

module.exports = alt.createStore(BlogStore, 'BlogStore');