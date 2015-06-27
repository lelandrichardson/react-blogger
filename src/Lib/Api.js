var owner = "rails";
var repo = "rails";
var baseUrl = "https://api.github.com";
var urlAppend = require('url-append');
var headerUtils = require('./headerUtils');
var normalizr = require('normalizr'),
    normalize = normalizr.normalize,
    Schema = normalizr.Schema,
    arrayOf = normalizr.arrayOf;

function GET ( url, shape, data ) {
    return new Promise(( resolve, reject ) => {
        var fullUrl = urlAppend(`${baseUrl}/repos/${owner}/${repo}/${url}`, data);

        function handleResponse ( r ) {
            var linkHeaders = r.headers.get("Link");
            var pages;
            if (linkHeaders) {
                // in this case we want to also parse the "Link" headers
                // from the GH api so that we know how many pages there are
                pages = headerUtils.getPages(linkHeaders);
            }

            r.json()
                .then(json => {
                    var normalized = normalize(json, shape);

                    return Object.assign(normalized, {
                        pages,
                        data,
                        url: fullUrl,
                        headers: r.headers

                    });
                })
                .then(resolve);
        }

        fetch(fullUrl, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            handleResponse,
            reject
        );
    });
}

var issue = new Schema('issues', { idAttribute: 'number' }),
    user = new Schema('users'),
    label = new Schema('labels'),
    comment = new Schema('comment');

issue.define({
    user: user,
    labels: arrayOf(label),
    assignee: user,
    closed_by: user
});

comment.define({
    user: user
});

/**
 * Our publicly exposed GitHub API. Nice and clean!
 */
var Api = {
    issues: {
        list: page => GET(`issues`, arrayOf(issue), { page }),
        get: number => GET(`issues/${number}`, issue),
        comments: number => GET(`issues/${number}/comments`, arrayOf(comment))
    }
};

module.exports = Api;