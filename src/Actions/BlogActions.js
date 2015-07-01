var alt = require('../alt');
var Api = require('../Lib/Api');

class BlogActions {
    constructor() {
        this.generateActions(
            'getFromId',
            'getFromIdSuccess',
            'getFromIdError',

            'getFromSlug',
            'getFromSlugSuccess',
            'getFromSlugError',

            //'update',
            'updateSuccess',
            'updateError'
        );
    }

    update(blog) {
        this.dispatch(blog);
        // ALTJS: would be nice if this was the default behavior of returning a promise...
        return Api.blog.update(blog).then(this.actions.updateSuccess, this.actions.updateError);
    }
}

module.exports = alt.createActions(BlogActions);