import Alt from 'alt';
import Http from './Lib/Http';
import Api from './Lib/Api.js'
import Router from 'react-router';
import React from 'react';
import Location from 'react-router/lib/Location';

export default class Flux extends Alt {
    constructor(config = {}) {
        super(config);

        this.req = config.req;
        this.Http = new Http(config.req);
        this.Api = Api(this.Http);

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

    render(routes, App) {
        return new Promise((resolve, reject) => {
            const location = new Location(this.req.baseUrl || this.req.url, this.req.query);
            this.Http.start();
            Router.run(routes, location, (error, initialState) => {
                if (error) { return reject(error); }

                // NOTE: this render pass is effectively wasted :(
                var _html = React.renderToString(<App location={location} flux={this} {...initialState} />);
                this.Http.stop();
                Promise.all(this.Http.promises).then(() => {
                    const html = React.renderToString(<App location={location} flux={this} {...initialState} />);
                    const data = this.takeSnapshot();
                    resolve({ html, data });
                }, reject);
            });
        });
    }
}