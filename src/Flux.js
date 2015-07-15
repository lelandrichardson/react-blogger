import Alt from 'alt';
import Http from './Lib/Http';
import Api from './Lib/Api.js'
import Router from 'react-router';
import React from 'react';
import Helmet from 'react-helmet';

if (__SERVER__) {
    var Location = require('react-router/lib/Location');
    var URL = require('url-parse');
    var SCRIPT_BASE_URL = __DEV__ ? '//localhost:9090' : '';
}


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
        if (__SERVER__) {
            return new Promise(( resolve, reject ) => {
                const url = new URL(this.req.baseUrl + this.req.url, true);
                const location = new Location(url.pathname, url.query);
                this.Http.start();
                Router.run(routes, location, ( error, initialState ) => {
                    if (error) { return reject(error); }

                    try {
                        // NOTE: this render pass is effectively wasted :(
                        var _html = React.renderToString(<App location={location} flux={this} {...initialState} />);
                        this.Http.stop();
                    } catch (e) {
                        return reject(e);
                    }

                    Promise.all(this.Http.promises).then(() => {
                        try {
                            //Helmet.rewind();
                            const html = React.renderToString(<App location={location} flux={this} {...initialState} />);
                            const head = Helmet.rewind();
                            const data = this.takeSnapshot();
                            resolve({ html, data, head, SCRIPT_BASE_URL });
                        } catch (e) {
                            return reject(e);
                        }
                    }, reject);
                });
            });
        }
    }
}