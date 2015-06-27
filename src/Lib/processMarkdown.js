// Capture github usernames in general text.
var username = /(^|\s)@([a-z0-9\-]+)\b/gmi;

/**
 * This function is meant to be run on unprocessed markdown text. It will
 * find usernames in the text prefixed with an @ symbol and transform them
 * into markdown links to their corresponding GitHub profile.
 * @param markdown {String}
 * @returns {String}
 */
module.exports = function ( markdown ) {
    markdown = markdown.replace(username, "$1[@$2](https://github.com/$2)");
    return markdown;
};