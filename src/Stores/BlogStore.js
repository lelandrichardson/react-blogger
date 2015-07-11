var { Map, List, fromJS } = require('immutable');
var EntityStore = require('../Mixins/EntityStore');
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
            return Api(alt.Http).blog.get(id);
        },
        local(store, id) {
            return store._state.get(id);
        },
        loading: BlogActions.getFromId,
        success: BlogActions.getFromIdSuccess,
        error: BlogActions.getFromIdError
    },
    getFromSlug: {
        remote(store, slug) {
            return Api(alt.Http).blog.getFromSlug(slug);
        },
        local(store, slug) {
            var id = store._slugToId.get(slug);
            return store._state.get(id);
        },
        loading: BlogActions.getFromSlug,
        success: BlogActions.getFromSlugSuccess,
        error: BlogActions.getFromSlugError
    }
});

export default class BlogStore extends EntityStore {
    constructor() {
        super();

        // TODO:
        // make entity store handle multiple keys (ie, "id" and "slug")
        // and correspondingly make a smarter `this.addEntity()` method...
        //super({ imdexBy: ['slug'] });
        this._slugToId = Map(); // slug => id
        this.registerDataSource(BlogDataSource);

        this.bindListeners({
            onReceiveBlog: [
                BlogActions.GET_FROM_ID_SUCCESS,
                BlogActions.GET_FROM_SLUG_SUCCESS,
                BlogActions.UPDATE_SUCCESS,
                BlogActions.UPDATE_BODY_SUCCESS,
                BlogActions.PUBLISH_SUCCESS,
                BlogActions.UNPUBLISH_SUCCESS,
                BlogActions.CREATE_SUCCESS
            ],
            onRemoveBlog: [
                BlogActions.REMOVE_SUCCESS
            ]
        })
    }

    onReceiveBlog(blog) {
        this._slugToId = this._slugToId.set(blog.slug, blog.id);
        this.set(blog.id, blog);
    }

    onRemoveBlog({ id }) {
        this._slugToId = this._slugToId.delete(id);
        this.delete(id);
    }

    //@onMiss(BlogActions.GET_FROM_SLUG)
    //getFromId(id) {
    //    return this.get(id)
    //}
}