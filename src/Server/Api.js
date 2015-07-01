var db = require('./sequelize');
var Blog = require('./Blog');
var Version = require('./Version');
var User = require('./User');

var express = require('express');

var FOR_PUBLIC = {
    raw: true,
    include: [
        {
            model: User,
            as: 'author',
            required: false
        },
        {
            model: Version,
            as: 'publishedVersion',
            required: false
        }
    ]
};

var FOR_EDITING = {
    raw: false,
    include: [
        {
            model: User,
            as: 'author',
            required: false
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


var Api = {
    blog: {
        get: id => Blog.findById(id, FOR_EDITING).then(x => x.toJSON()),
        getFromSlug: slug => Blog.find(Object.assign({ where: { slug }}, FOR_PUBLIC)),

        create(model) {
            return Blog
                .create(model)
                .then(() => Api.blog.get(blogId));
        },

        update(id, model) {
            return Blog
                .update(model, { where: { id } })
                .then(() => Api.blog.get(id));
        },

        updateBody(blogId, body) {
            return Blog
                .findById(blogId)
                .then(blog => blog.createEditingVersion({ blogId, body }))
                .then(() => Api.blog.get(blogId));
        },

        publish(id, versionId) {
            return Blog
                .findById(id)
                .then(blog => blog.setPublishedVersion(versionId))
        }
    }
};


var router = express.Router();

// a function which expects a function with (req/res) as parameters that returns
// a promise. When the promise is resolved, it will spit it out to the client as json.
function ApiRequest(fn) {
    return (req, res) => {
        fn(req, res).then(x => res.json(x), err => res.status(500).json({
            message: err.message,
            stack: err.stack
        }));
    };
}

router.get('/blog/from-slug', ApiRequest((req, res) => Api.blog.getFromSlug(req.query.slug)));
router.get('/blog/:id', ApiRequest((req, res) => Api.blog.get(+req.params.id)));
router.put('/blog/', ApiRequest(function (req, res) {
    var model = Object.assign({}, req.body, { authorId: req.user });
    return Api.blog.create(model);
}));

router.post('/blog/:id/body', ApiRequest(function (req, res) {
    return Api.blog.updateBody(+req.params.id, req.body.body);
}));

router.post('/blog/:id', ApiRequest(function (req, res) {
    return Api.blog.update(+req.params.id, req.body);
}));

module.exports = router;