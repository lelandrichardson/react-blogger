var { Map, List, fromJS } = require('immutable');
var EntityStore = require('../Mixins/EntityStore');
var alt = require('../alt');

class BlogStore extends EntityStore {
    constructor() {
        super();
        this.on('init', () => this.init());
    }

    init() {
        this.set('slug', {
            title: "this is some blog",
            slug: "slug",
            body: `
# This is a header

This is a paragraph

- here
- is a list
- of some items

    this should be some code

> this should be a quote

        `});
    }

    static getFromSlug(slug) {
        return this.get(slug);
    }
}

module.exports = alt.createStore(BlogStore, 'BlogStore');