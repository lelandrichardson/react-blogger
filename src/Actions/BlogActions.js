var Api = require('../Lib/Api');
var { async } = require('../Mixins/alt-decorators');

export default class BlogActions {
    constructor(alt) {
        this.Api = Api(alt);
        this.generateActions.apply(this, this.__actions__ || []);
        this.generateActions(
            'getFromId',
            'getFromIdSuccess',
            'getFromIdError',

            'getFromSlug',
            'getFromSlugSuccess',
            'getFromSlugError',

            'listAll',
            'listAllSuccess',
            'listAllError'
        );
    }

    @async
    update(blog) {
        return Api().blog.update(blog); // TODO: figure out way to get at `this.Api`
    }

    @async
    updateBody(id, body) {
        return Api().blog.updateBody(id, body)
    }

    @async
    publish(id) {
        return Api().blog.publish(id);
    }

    @async
    unpublish(id) {
        return Api().blog.unpublish(id);
    }

    @async
    remove(id) {
        return Api().blog.remove(id);
    }

    @async
    create(model) {
        return Api().blog.create(model);
    }
}