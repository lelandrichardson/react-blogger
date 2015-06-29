var urlAppend = require('url-append');

var GET = ( url, data ) => new Promise(( resolve, reject ) => {
    var fullUrl = urlAppend(`/api/${url}`, data);
    fetch(fullUrl, { headers: { "Content-Type": "application/json" } })
        .then(r => r.json())
        .then(resolve, reject);
});
var AJAX = ( method, url, data, query ) => new Promise(( resolve, reject ) => {
    var fullUrl = urlAppend(`/api/${url}`, query);
    fetch(fullUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(resolve, reject);
});
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