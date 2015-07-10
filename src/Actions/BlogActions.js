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
        return this.Api.blog.update(blog);
    }

    @async
    updateBody(id, body) {
        return this.Api.blog.updateBody(id, body)
    }

    @async
    publish(id) {
        return this.Api.blog.publish(id);
    }

    @async
    unpublish(id) {
        return this.Api.blog.unpublish(id);
    }

    @async
    remove(id) {
        return this.Api.blog.remove(id);
    }

    @async
    create(model) {
        return this.Api.blog.create(model);
    }
}