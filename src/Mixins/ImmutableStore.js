var {
    Map,
    List,
    fromJS
    } = require('immutable');

class ImmutableStore {
    constructor() {
        this.exportPublicMethods({
            get: this.get,
            getIn: this.getIn,
            has: this.has,
            hasIn: this.hasIn
        });
    }

    changed() {
        if (this.getInstance()) {
            this.getInstance().emitChange();
        }
    }

    set ( prop, value ) {
        this.state = this.state.set(prop, fromJS(value));
        this.changed();
    }

    setIn ( path, value ) {
        this.state = this.state.setIn(path, fromJS(value));
        this.changed();
    }

    update ( a, b, c ) {
        this.state = this.state.update(a, b, c);
        this.changed();
    }

    updateIn ( a, b, c ) {
        this.state = this.state.updateIn(a, b, c);
        this.changed();
    }

    merge ( obj ) {
        this.state = this.state.merge(obj);
        this.changed();
    }

    mergeIn ( path, obj ) {
        this.state = this.state.mergeIn(path, obj);
        this.changed();
    }

    get ( prop ) {
        return this.getState().state.get(prop);
    }

    getIn ( path ) {
        return this.getState().state.getIn(path);
    }

    has ( prop ) {
        return this.getState().state.has(prop);
    }

    hasIn ( path ) {
        return this.getState().state.hasIn(path);
    }
}

module.exports = ImmutableStore;