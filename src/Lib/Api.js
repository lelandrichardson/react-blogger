var urlAppend = require('url-append');

var AJAX = ( method, url, data, query ) => fetch(urlAppend(`/api/${url}`, query), {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: data ? JSON.stringify(data) : undefined
    }).then(r => r.json());
var GET = ( url, data ) => AJAX('GET', url, null, data);
var POST = (url, data, query ) => AJAX('POST', url, data, query);
var PUT = (url, data, query ) => AJAX('PUT', url, data, query);

var Api = {
    blog: {
        get: id => GET(`blog/${id}`),
        getFromSlug: slug => GET(`blog/from-slug/${slug}`),
        create: model => PUT(`blog`, model),
        update: model => POST(`blog/${model.id}`, model)
    }
};

module.exports = Api;