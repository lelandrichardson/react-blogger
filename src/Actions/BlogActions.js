var Api = require('../Lib/Api');
var { async } = require('../Mixins/alt-decorators');

export default class BlogActions {
    constructor() {
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
        return this.alt.Api.blog.update(blog);
    }

    @async
    updateBody(id, body) {
        return this.alt.Api.blog.updateBody(id, body)
    }

    @async
    publish(id) {
        return this.alt.Api.blog.publish(id);
    }

    @async
    unpublish(id) {
        return this.alt.Api.blog.unpublish(id);
    }

    @async
    remove(id) {
        return this.alt.Api.blog.remove(id);
    }

    @async
    create(model) {
        return this.alt.Api.blog.create(model);
    }
}