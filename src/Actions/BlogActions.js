var alt = require('../alt');
var Api = require('../Lib/Api');
var { async, actions } = require('../Mixins/alt-decorators');

@actions(alt)
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
        return Api.blog.update(blog);
    }

    @async
    updateBody(id, body) {
        return Api.blog.updateBody(id, body)
    }

    @async
    publish(id) {
        return Api.blog.publish(id);
    }

    @async
    unpublish(id) {
        return Api.blog.unpublish(id);
    }

    @async
    remove(id) {
        return Api.blog.remove(id);
    }

    @async
    create(model) {
        return Api.blog.create(model);
    }
}

//module.exports = alt.createActions(BlogActions);