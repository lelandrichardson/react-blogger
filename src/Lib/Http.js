import superagent from 'superagent';

var prefix = __CLIENT__ ?
                '' :
                `http://${process.env.BASE_URL}`;

console.log(`Base URL: ${process.env.BASE_URL}`);

export function AJAX(method, url, data, query, req) {
    return new Promise((resolve, reject) => {
        let request = superagent[method](`${prefix}/api/${url}`);
        if (query) {
            request.query(query);
        }
        if (__SERVER__) {
            if(req.get('cookie')){
                request.set('cookie', req.get('cookie'));
            }
        }
        if (data) {
            request.send(data);
        }
        request.end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.body);
            }
        });
    });
}

export default class Http {
    constructor(req) {
        this.req = req;
        this.watching = false;
        this.promises = [];
        this.GET = this.wrap(this.GET);
        this.POST = this.wrap(this.POST);
        this.PUT = this.wrap(this.PUT);
        this.DELETE = this.wrap(this.DELETE);
    }
    GET(url, query) {
        return AJAX('get', url, null, query, this.req);
    }
    POST(url, data, query) {
        return AJAX('post', url, data, query, this.req);
    }
    PUT(url, data, query) {
        return AJAX('put', url, data, query, this.req);
    }
    DELETE(url, query) {
        return AJAX('del', url, null, query, this.req);
    }
    start() {
        this.watching = true;
        this.promises = [];
    }
    stop() {
        this.watching = false;
    }
    wrap(fn) {
        return function() {
            var promise = fn.apply(this, arguments);
            if (this.watching) {
                this.promises.push(promise);
            }
            return promise;
        }.bind(this);
    }
}