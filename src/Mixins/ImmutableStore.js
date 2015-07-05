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
        this.dirty = false;
        this.changeTick = this.changeTick.bind(this);
        requestAnimationFrame(this.changeTick);
    }

    changeTick() {
        if (this.dirty) {
            this.emitChange();
            this.dirty = false;
        }
        requestAnimationFrame(this.changeTick);
    }

    changed() {
        this.dirty = true;
    }

    set ( prop, value ) {
        this._state = this._state.set(prop, fromJS(value));
        this.changed();
    }

    setIn ( path, value ) {
        this._state = this._state.setIn(path, fromJS(value));
        this.changed();
    }

    delete ( prop ) {
        this._state = this._state.delete(prop);
        this.changed();
    }

    deleteIn ( path ) {
        this._state = this._state.deleteIn(path);
        this.changed();
    }

    update ( a, b, c ) {
        this._state = this._state.update(a, b, c);
        this.changed();
    }

    updateIn ( a, b, c ) {
        this._state = this._state.updateIn(a, b, c);
        this.changed();
    }

    merge ( obj ) {
        this._state = this._state.merge(obj);
        this.changed();
    }

    mergeIn ( path, obj ) {
        this._state = this._state.mergeIn(path, obj);
        this.changed();
    }

    get ( prop ) {
        return this._state.get(prop);
    }

    getIn ( path ) {
        return this._state.getIn(path);
    }

    has ( prop ) {
        return this._state.has(prop);
    }

    hasIn ( path ) {
        return this._state.hasIn(path);
    }
}

module.exports = ImmutableStore;