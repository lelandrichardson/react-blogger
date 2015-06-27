/**
 * This is used to truncate the body of an issue per the requirements given.
 * @param body {String}
 * @param length {Number} the desired "max length" of the returned string
 * @returns {String}
 */
module.exports = function ( body, length ) {
    if (body.length > length) {
        body = body.substr(0, body.lastIndexOf(' ', length));
        body += '…';
    }
    return body;
};