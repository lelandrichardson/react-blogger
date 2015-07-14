var { Map } = require('immutable');
var ImmutableStore = require('./ImmutableStore');

class EntityStore extends ImmutableStore {
    constructor(opts = {}) {
        super();
        this._state = Map();
        if (opts.indexBy) {
            opts.indexBy.forEach(index => {
                var upperIndex = index[0].toUpperCase() + index.substr(1);
                this[`_${index}ToId`] = Map();
                this[`getFrom${upperIndex}`] = function (x) {
                    return this.get(this[`_${index}ToId`].get(x));
                };
            });
        }
    }

    setEntity(entity) {
        this._state = this._state.set(entity[this.id], entity);
        if (opts.indexBy) {
            opts.indexBy.forEach(index => {
                this[`_${index}ToId`] = this[`_${index}ToId`].set(entity[index], entity[this.id])
            });
        }
        this.dirty = true;
    }

    removeEntity(entity) {
        this._state = this._state.remove(entity[this.id]);
        if (opts.indexBy) {
            opts.indexBy.forEach(index => {
                this[`_${index}ToId`] = this[`_${index}ToId`].remove(entity[index])
            });
        }
        this.dirty = true;
    }
}

module.exports = EntityStore;