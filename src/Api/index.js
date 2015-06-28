var express = require('express');
var router = express.Router();

router.use('/user', require('./user.authentication'));
router.use('/user', require('./user'));
router.use('/page', require('./page'));
router.use('/item', require('./item'));

router.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    res.error(500, err.stack, err);
});

module.exports = router;