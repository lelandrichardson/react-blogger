var Sequelize = require('sequelize');
var {
        STRING,
        DATE,
        BOOLEAN,
        JSON,
        FLOAT,
        DOUBLE,
        INTEGER,
        ENUM,
        NOW
    } = Sequelize;

var bcrypt = require('bcrypt');
var db = require('./../Server/sequelize');

var User = require('./User');
var Version = require('./Version');

var Blog = db.define('blog', {
    title: STRING,
    subtitle: STRING,
    slug: {
        type: STRING,
        validate: {
            is: /^[a-z0-9_\-]+$/i
        }
    },
    slugIsControlled: {
        type: BOOLEAN,
        defaultValue: true
    },
    summary: STRING,
    datePublished: DATE,
    type: {
        type: STRING(4),
        defaultValue: 'blog',
        allowNull: false,
        validate: {
            isIn: [['blog','page']]
        }
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['slug']
        }
    ],
    scopes: {
        pages: {
            where: {
                type: 'page'
            }
        },
        published: {
            where: {
                datePublished: { $ne: null },
                type: 'blog'
            }
        },
        drafts: {
            where: {
                datePublished: { $eq: null },
                type: 'blog'
            }
        }
    }
});

// relationships...
Blog.belongsTo(User, { as: 'author' });

Blog.hasMany(Version);
Blog.belongsTo(Version, { as: 'publishedVersion', foreignKey: 'publishedVersionId', constraints: false });
Blog.belongsTo(Version, { as: 'editingVersion', foreignKey: 'editingVersionId', constraints: false });

module.exports = Blog;