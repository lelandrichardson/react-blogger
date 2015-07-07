var { Map, List, fromJS } = require('immutable');
var FilteredListStore = require('../Mixins/FilteredListStore');
var alt = require('../alt');
var Api = require('../Lib/Api');
var BlogActions = require('../Actions/BlogActions');
var { store, handles } = require('../Mixins/alt-decorators');

const BlogListDataSource = alt => ({
    listAll: {
        remote(store, filter, page) {
            return Api.blog
                .list({ ...filter, offset: page * 10 })
                .then(result => ({ ...result, page, filter }));
        },
        local(store, filter, page) {
            var key = FilteredListStore.prototype.key(filter);
            var items = store._state.getIn([key, 'pages', page]);
            if (!items) return null;

            var total = store._state.getIn([key, 'total']);
            return { items, total };
        },
        loading: BlogActions.listAll,
        success: BlogActions.listAllSuccess,
        error: BlogActions.listAllError
    }
});

@store(alt)
export default class SummaryStore extends FilteredListStore {
    constructor(listeners) {
        super();
        this.registerDataSource(BlogListDataSource);
        this.bindListeners(listeners);
    }

    @handles(BlogActions.LIST_ALL_SUCCESS)
    onReceiveResult({ filter, count, page, rows }) {
        this.setPage(filter, page, rows, count);
    }

    @handles(BlogActions.UPDATE_SUCCESS)
    @handles(BlogActions.PUBLISH_SUCCESS)
    @handles(BlogActions.UNPUBLISH_SUCCESS)
    @handles(BlogActions.REMOVE_SUCCESS)
    @handles(BlogActions.CREATE_SUCCESS)
    clearAll() {
        this._state = Map();
        this.changed();
    }

}