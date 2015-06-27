/**
 * Formats a number according to the passed in parameters.
 * Copied from http://stackoverflow.com/a/14428340/1424349
 *
 * Examples:
 * =========
 * fn(1234) => "1,234"
 * fn(12345, 2) => "12,345.00"
 * fn(123456.7, 3, 2) => "12,34,56.700"
 * fn(123456.789, 2, 4) => "12,3456.79"
 *
 * @param num {Number} the number to format
 * @param n {Number} the number of decimal places. Defaults to 0
 * @param x {Number} the number of digits between commas Defaults to 3
 * @returns {string}
 */
module.exports = function ( num, n, x ) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return (+num).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};