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
        this.emitChange();
        //if (this.getInstance()) {
        //    this.getInstance().emitChange();
        //}
    }

    set ( prop, value ) {
        this.state = this.getInstance().state.set(prop, fromJS(value));
        this.changed();
    }

    setIn ( path, value ) {
        this.state = this.getInstance().state.setIn(path, fromJS(value));
        this.changed();
    }

    update ( a, b, c ) {
        this.state = this.getInstance().state.update(a, b, c);
        this.changed();
    }

    updateIn ( a, b, c ) {
        this.state = this.getInstance().state.updateIn(a, b, c);
        this.changed();
    }

    merge ( obj ) {
        this.state = this.getInstance().state.merge(obj);
        this.changed();
    }

    mergeIn ( path, obj ) {
        this.state = this.getInstance().state.mergeIn(path, obj);
        this.changed();
    }

    get ( prop ) {
        return this.state.get(prop);
    }

    getIn ( path ) {
        return this.state.getIn(path);
    }

    has ( prop ) {
        return this.state.has(prop);
    }

    hasIn ( path ) {
        return this.state.hasIn(path);
    }
}

module.exports = ImmutableStore;