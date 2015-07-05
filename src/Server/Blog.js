var Sequelize = require('sequelize');
var {
        STRING,
        DATE,
        BOOLEAN,
        JSON,
        FLOAT,
        DOUBLE,
        INTEGER,
        NOW
    } = Sequelize;

var bcrypt = require('bcrypt');
var db = require('./sequelize');

var User = require('./User');
var Version = require('./Version');

var Blog = db.define('blog', {
    title: STRING,
    subtitle: STRING,
    slug: {
        type: STRING
    },
    summary: STRING,
    datePublished: DATE
}, {
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['slug']
        }
    ],
    scopes: {
        published: {
            where: {
                datePublished: { $ne: null }
            }
        },
        drafts: {
            where: {
                datePublished: { $eq: null }
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