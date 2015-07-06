var db = require('./sequelize');
var Blog = require('./../Models/Blog');
var Version = require('./../Models/Version');
var User = require('./../Models/User');
var shortid = require('shortid');

var express = require('express');

var FOR_PUBLIC = {
    include: [
        {
            model: User,
            as: 'author',
            required: false,
            attributes: [
                'id',
                'name'
            ]
        },
        {
            model: Version,
            as: 'publishedVersion',
            required: false
        }
    ]
};

var FOR_EDITING = {
    include: [
        {
            model: User,
            as: 'author',
            required: false,
            attributes: [
                'id',
                'name'
            ]
        },
        {
            model: Version,
            as: 'publishedVersion',
            required: false
        },
        {
            model: Version,
            as: 'editingVersion',
            required: false
        }
    ]
};

var FOR_SUMMARY = {
    include: []
};


var Api = {
    blog: {

        list(scope, offset = 0) {
            const filter = Object.assign(
                { where: {}, offset },
                { limit: 10, order: [['datePublished','DESC'],['createdAt','DESC']] },
                FOR_SUMMARY
            );
            return Blog
                .scope(scope)
                .findAndCountAll(filter)
                .then(({ count, rows }) => ({
                    count,
                    rows: rows.map(blog => blog.toJSON())
                }));
        },

        get(id) {
            return Blog
                .findById(id, FOR_EDITING)
                .then(x => x.toJSON());
        },

        getFromSlug(slug) {
            return Blog
                .find(Object.assign({ where: { slug }}, FOR_PUBLIC))
                .then(x => x.toJSON());
        },

        create(model) {
            const { body = "" } = model;

            model = Object.assign({}, { slug: shortid.generate() }, model);

            return Blog
                .create(model)
                .then(blog => blog.createEditingVersion({ blogId: blog.id, body }))
                .then(blog => Api.blog.get(blog.id));
        },

        update(id, model) {
            const { blogId, body } = model.editingVersion;
            //TODO: it might be a good idea to "collapse" all of the "autoSave" versions of the body
            return Blog
                .update(model, { where: { id } })
                .then(() => Api.blog.updateBody(blogId, body));
        },

        updateBody(blogId, body) {
            return Blog
                .findById(blogId)
                .then(blog => blog.createEditingVersion({ blogId, body }))
                .then(() => Api.blog.get(blogId));
        },

        publish(id) {
            return Blog
                .findById(id)
                .then(blog => blog.setPublishedVersion(blog.editingVersionId))
                .then(() => Blog.update({ datePublished: new Date() }, { where: { id }})
                .then(() => Api.blog.get(id))
            );
        },

        unpublish(id) {
            return Blog
                .update({ datePublished: null, publishedVersionId: null }, { where: { id }})
                .then(() => Api.blog.get(id));
        },

        remove(id) {
            return Blog
                .destroy({ where: { id }})
                .then(() => ({ id }));
        }
    }
};

var AUTHENTICATE = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({
            message: "You are not authorized to see this resource"
        });
    }
};

var router = express.Router();

// a function which expects a function with (req/res) as parameters that returns
// a promise. When the promise is resolved, it will spit it out to the client as json.
function ApiRequest(fn) {
    return (req, res) => {
        var result = fn(req, res);
        if (result && (typeof result.then) === 'function') {
            result.then(x => res.json(x), err => res.status(500).json({
                message: err.message,
                stack: err.stack
            }));
        } else {
            return result;
        }
    };
}

router.get('/blog/list', ApiRequest(function(req, res) {
    var { scope, offset } = req.query;
    if (scope !== "published" && !req.isAuthenticated()) {
        //TODO: not authorized
        return res.status(401).json({
            message: "You are not authorized to see this resource"
        });
    }
    return Api.blog.list(scope, +offset);
}));
router.get('/blog/from-slug/:slug', ApiRequest((req, res) => Api.blog.getFromSlug(req.params.slug)));
router.get('/blog/:id', AUTHENTICATE, ApiRequest((req, res) => Api.blog.get(+req.params.id)));
router.put('/blog/', AUTHENTICATE, ApiRequest(function (req, res) {
    var model = Object.assign({}, req.body, { authorId: req.user.id });
    return Api.blog.create(model);
}));

router.post('/blog/:id/body', AUTHENTICATE, AUTHENTICATE, ApiRequest(function (req, res) {
    return Api.blog.updateBody(+req.params.id, req.body.body);
}));

router.post('/blog/:id', AUTHENTICATE, ApiRequest(function (req, res) {
    return Api.blog.update(+req.params.id, req.body);
}));

router.post('/blog/:id/publish', AUTHENTICATE, ApiRequest(function (req, res) {
    return Api.blog.publish(+req.params.id);
}));

router.post('/blog/:id/unpublish', AUTHENTICATE, ApiRequest(function (req, res) {
    return Api.blog.unpublish(+req.params.id);
}));

router.post('/blog/:id/remove', AUTHENTICATE, ApiRequest(function (req, res) {
    return Api.blog.remove(+req.params.id);
}));

module.exports = router;