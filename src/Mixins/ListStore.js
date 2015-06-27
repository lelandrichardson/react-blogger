var { List, fromJS } = require('immutable');
var ImmutableStore = require('./ImmutableStore');

class ListStore extends ImmutableStore {
    constructor() {
        super();
        this.state = List();
        this.exportPublicMethods({
            push: this.push
        });
    }

    push(entity) {
        this.state = this.state.push(fromJS(entity));
    }
}

module.exports = ListStore;