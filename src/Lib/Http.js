import superagent from 'superagent';

var prefix = __SERVER__ ? `http://localhost:${3030}` : '';

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

export default class ApiClient {
    constructor(req) {
        this.req = req;
        this.GET = this.GET.bind(this);
        this.POST = this.POST.bind(this);
        this.PUT = this.PUT.bind(this);
        this.DELETE = this.DELETE.bind(this);
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
}