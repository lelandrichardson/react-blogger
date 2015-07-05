var {  Map, List, fromJS } = require('immutable');
var ImmutableStore = require('./ImmutableStore');

class FilteredListStore extends ImmutableStore {

    //{
    //    [{filter}]: {
    //        filter: {
    //            // ...
    //        },
    //        total: 1234,
    //        pages: {
    //            1: [ "abc", "def", "ghi" /*, ... */],
    //            2: [ "jkl", "mno", "pqr" /*, ... */],
    //            // ...
    //        }
    //    }
    //}

    constructor() {
        super();
        this._state = Map();
        this.size = 10;
    }

    key(filter) {
        filter = Map.isMap(filter) ? filter : fromJS(filter);
        return filter.hashCode();
    }

    static getPage(filter, page) {
        return this.getIn([this.key(filter), 'pages', page]);
    }

    setPage(filter, page, items, count) {
        const key = this.key(filter);
        this.ensure(key, filter);
        this.setIn([key, 'pages', page], fromJS(items));
        if (count !== undefined) {
            this.setIn([key, 'total'], count);
        }
    }

    setPages(filter, total, pages) {
        const key = this.key(filter);
        this.ensure(key, filter);
        this.setIn([key, 'total'], total);
        pages.forEach((page, i) => this.setIn([key, 'pages', i], fromJS(page)));
    }

    ensure(key, filter) {
        if(this.has(key)) {
            return;
        }
        this.set(key, {
            filter,
            total: null,
            pages: {}
        });
    }
}

module.exports = FilteredListStore;