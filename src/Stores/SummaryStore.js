var { Map, List, fromJS } = require('immutable');
var FilteredListStore = require('../Mixins/FilteredListStore');
var Api = require('../Lib/Api');
var BlogActions = require('../Actions/BlogActions');

const BlogListDataSource = alt => ({
    listAll: {
        remote(store, filter, page) {
            return Api(alt).blog
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

export default class SummaryStore extends FilteredListStore {
    constructor() {
        super();
        this.registerDataSource(BlogListDataSource);
        this.bindListeners({
            onReceiveResult: [
                BlogActions.LIST_ALL_SUCCESS
            ],
            clearAll: [
                BlogActions.UPDATE_SUCCESS,
                BlogActions.PUBLISH_SUCCESS,
                BlogActions.UNPUBLISH_SUCCESS,
                BlogActions.REMOVE_SUCCESS,
                BlogActions.CREATE_SUCCESS,
            ]
        });
    }

    onReceiveResult({ filter, count, page, rows }) {
        this.setPage(filter, page, rows, count);
    }

    clearAll() {
        this._state = Map();
        this.changed();
    }

}