var { Map, List, fromJS } = require('immutable');
var EntityStore = require('../Mixins/EntityStore');
var alt = require('../alt');

class BlogStore extends EntityStore {
    constructor() {
        super();
    }

    init() {

    }

    static getFromSlug(slug) {
        return this.get(slug);
    }

    static getFromId(slug) {
        return this.get(slug);
    }

    static getNew() {
        return Map();
    }
}

module.exports = alt.createStore(BlogStore, 'BlogStore');