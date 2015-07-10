import Alt from 'alt';
import Http from './Lib/Http';

export default class Flux extends Alt {
    constructor(config = {}) {
        super(config);

        this.Http = new Http(config.req);

        // Actions
        this.addActionsClass('BlogActions', require('./Actions/BlogActions'));

        // Stores
        this.addStore('BlogStore', require('./Stores/BlogStore'));
        this.addStore('SummaryStore', require('./Stores/SummaryStore'));
        this.addStore('RouteStore', require('./Stores/RouteStore'));
    }

    addActionsClass(name, ActionClass) {
        return this.addActions(name, ActionClass, ActionClass, this);
    }
}