var Flux = require('react-flux');
var { Map, List, fromJS } = require('immutable');
var _dispatcher = Flux.createStore({},[])._dispatcher;

var MISSING = {};

class EntityStore {
    constructor (dispatcher, getter, name, normalizedResponses) {
        this._dispatcher = dispatcher;
        this._getter = getter;

        this.state = Map();
        this.optimistic = Map();
        this.dirty = false;
        this.requested = [];

        normalizedResponses.forEach(constant => {
            dispatcher.register(constant, ({ entities }) => {
                this.mergeSet(entities[name]);
            });
        });

        this.tick = this.tick.bind(this);

        requestAnimationFrame(this.tick);
    }

    get (id) {
        var optimistic = this.optimistic.get(id, MISSING);
        if (optimistic !== MISSING) {
            return optimistic;
        }

        var entity = this.state.get(id, MISSING);
        if (entity === MISSING) {
            this.requested.push(id);
            return null;
        }
        return entity;
    }

    merge (entity) {
        this.optimistic = this.optimistic.delete(this._getter(entity));
        this.state = this.state.set(this._getter(entity), fromJS(entity));
        this.dirty = true;
    }

    mergeSet (entities) {
        for (var id in entities) {
            this.merge(entities[id]);
        }
    }

    mergeOptimistic (entity) {
        this.optimistic = this.optimistic.set(this._getter(entity), entity);
        this.dirty = true;
    }

    tick () {
        if (this.dirty) {
            this.emit('change');
        }
        requestAnimationFrame(this.tick);
    }

    on (evt, handler) {

    }

    off (evt, handler) {

    }

    emit (evt) {

    }
}

module.exports = {
    create(spec) {
        return new EntityStore();
    }
};