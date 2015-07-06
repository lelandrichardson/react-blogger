var { Map, List, fromJS } = require('immutable');
var EntityStore = require('../Mixins/EntityStore');
var alt = require('../alt');
var Api = require('../Lib/Api');
var BlogActions = require('../Actions/BlogActions');
var { store, handles } = require('../Mixins/alt-decorators');

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
            return store._state.get(id);
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
            var id = store._slugToId.get(slug);
            return store._state.get(id);
        },
        loading: BlogActions.getFromSlug,
        success: BlogActions.getFromSlugSuccess,
        error: BlogActions.getFromSlugError
    }
});

@store(alt)
export default class BlogStore extends EntityStore {
    constructor(listeners) {
        super();

        // TODO:
        // make entity store handle multiple keys (ie, "id" and "slug")
        // and correspondingly make a smarter `this.addEntity()` method...
        //super({ imdexBy: ['slug'] });
        this._slugToId = Map(); // slug => id
        this.registerDataSource(BlogDataSource);

        this.bindListeners(listeners);
    }

    @handles(BlogActions.GET_FROM_ID_SUCCESS)
    @handles(BlogActions.GET_FROM_SLUG_SUCCESS)
    @handles(BlogActions.UPDATE_SUCCESS)
    @handles(BlogActions.UPDATE_BODY_SUCCESS)
    @handles(BlogActions.PUBLISH_SUCCESS)
    @handles(BlogActions.UNPUBLISH_SUCCESS)
    @handles(BlogActions.CREATE_SUCCESS)
    onReceiveBlog(blog) {
        this._slugToId = this._slugToId.set(blog.slug, blog.id);
        this.set(blog.id, blog);
    }

    @handles(BlogActions.REMOVE_SUCCESS)
    onRemoveBlog({ id }) {
        this._slugToId = this._slugToId.delete(id);
        this.delete(id);
    }

    //@onMiss(BlogActions.GET_FROM_SLUG)
    //getFromId(id) {
    //    return this.get(id)
    //}
}