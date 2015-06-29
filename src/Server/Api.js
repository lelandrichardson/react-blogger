var db = require('./sequelize');
var Blog = require('./Blog');
var Version = require('./Version');
var User = require('./User');

var express = require('express');

var FOR_PUBLIC = {
    raw: true,
    include: [
        {
            association: 'author',
            required: true
        },
        {
            association: 'publishedVersion'
        },
        {
            association: 'editingVersion',
            required: true
        }
    ]
};

var FOR_EDITING = {
    raw: true,
    include: [
        {
            association: 'author',
            required: true
        },
        {
            association: 'publishedVersion'
        },
        {
            association: 'editingVersion',
            required: true
        }
    ]
};


var Api = {
    blog: {
        get: id => Blog.findById(id, FOR_EDITING),
        getFromSlug: slug => Blog.findOne(Object.assign({ where: { slug }}, FOR_PUBLIC)),
        create: model => Blog.create(model).then(x => x.toJSON())
    }
};


var router = express.Router();

// a function which expects a function with (req/res) as parameters that returns
// a promise. When the promise is resolved, it will spit it out to the client as json.
function JSON(fn) {
    return (req, res) => {
        fn(req, res).then(x => res.json(x), err => res.status(500).json(err));
    };
}

router.get('/blog/from-slug', JSON((req, res) => Api.blog.getFromSlug(req.query.slug)));
router.get('/blog/:id', JSON((req, res) => Api.blog.get(+req.params.id)));
router.put('/blog/', JSON((req, res) => Api.blog.create(Object.assign({}, req.body, { authorId: req.user}))));


module.exports = router;