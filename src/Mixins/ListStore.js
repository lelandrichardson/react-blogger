var { List, fromJS } = require('immutable');
var ImmutableStore = require('./ImmutableStore');

class ListStore extends ImmutableStore {
    constructor() {
        super();
        this._state = List();
        this.exportPublicMethods({
            push: this.push
        });
    }

    push(...entities) {
        this._state = this._state.push(...entities.map(fromJS));
        this.changed();
    }

    pop() {
        var last = this._state.last();
        this._state = this._state.pop();
        this.changed();
        return last;
    }

    unshift(...entities) {
        this._state = this._state.unshift(...entities.map(fromJS));
        this.changed();
    }

    shift() {
        var first = this._state.first();
        this._state = this._state.shift();
        this.changed();
        return first;
    }

    ['delete'](index) {
        this._state = this._state.delete(index);
        this.changed();
    }

    clear() {
        this._state = this._state.clear();
        this.changed();
    }
}

module.exports = ListStore;