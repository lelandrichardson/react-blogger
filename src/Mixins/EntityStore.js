var { Map } = require('immutable');
var ImmutableStore = require('./ImmutableStore');

class EntityStore extends ImmutableStore {
    constructor() {
        super();
        this._state = Map();
    }
}

module.exports = EntityStore;