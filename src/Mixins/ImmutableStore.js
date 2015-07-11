var {
    Map,
    List,
    fromJS,
    Seq
    } = require('immutable');
import fromJSSpecial from '../Lib/fromJSSpecial.js';

class ImmutableStore {
    static config = {
        setState(currentState, nextState) {
            this._state = nextState;
            return this._state;
        },

        getState(currentState) {
            return currentState
        },

        onSerialize(state) {
            return state;
        },

        onDeserialize(data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    data[i] = fromJSSpecial(data[i]);
                }
            }
            return data;
        }
    }
    constructor() {
        this.exportPublicMethods({
            get: this.get,
            getIn: this.getIn,
            has: this.has,
            hasIn: this.hasIn
        });
        this.dirty = false;
        //this.changeTick = this.changeTick.bind(this);
        if (__CLIENT__) {
            requestAnimationFrame(this.changeTick.bind(this));
        }
    }

    changeTick() {
        if (this.dirty) {
            this.emitChange();
            this.dirty = false;
        }
        if(__CLIENT__) {
            requestAnimationFrame(this.changeTick.bind(this));
        }
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