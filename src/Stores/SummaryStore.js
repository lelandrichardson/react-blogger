var { Map, List, fromJS } = require('immutable');
var ListStore = require('../Mixins/ListStore');
var alt = require('../alt');

class SummaryStore extends ListStore {
    constructor() {
        super();
        this.on('init', () => this.init());
    }

    init() {
        this.push({
            title: "This is Blog1",
            slug: "blog1",
            summary: `
This is a paragraph

- here
- is a list
- of some items

    this should be some code

> this should be a quote

        `});
        this.push({
            title: "This is Blog2",
            slug: "blog2",
            summary: `
This is a paragraph

- here
- is a list
- of some items

    this should be some code

> this should be a quote

        `});
    }

    static getAll() {
        return this.getState().state;
    }
}

module.exports = alt.createStore(SummaryStore, 'SummaryStore');