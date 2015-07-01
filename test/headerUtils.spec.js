var headerUtils = require('../src/Lib/headerUtils');

var singleLink = `<https://api.github.com/repositories/8514/issues?page=3>; rel="next"`;
var singleLinkUrl = `https://api.github.com/repositories/8514/issues?page=3`;
var singleLinkRel = `next`;
var fullHeader = `<https://api.github.com/repositories/8514/issues?page=3>; rel="next", ` +
                 `<https://api.github.com/repositories/8514/issues?page=27>; rel="last", ` +
                 `<https://api.github.com/repositories/8514/issues?page=1>; rel="first", ` +
                 `<https://api.github.com/repositories/8514/issues?page=1>; rel="prev"`;

describe("headerUtils", function() {

    describe("getLink", function () {
        var fn = headerUtils.getLink;

        it("should parse the link", function () {
            expect(fn(singleLink)).toEqual(singleLinkUrl);
        });

    });

    describe("getRel", function () {
        var fn = headerUtils.getRel;

        it("should parse the rel", function () {
            expect(fn(singleLink)).toEqual(singleLinkRel);
        });

    });

    describe("getPageNumber", function () {
        var fn = headerUtils.getPageNumber;

        it("should parse the page parameter", function () {
            expect(fn(headerUtils.getLink(singleLink))).toEqual(3)
        });

    });

    describe("getPages", function () {
        var fn = headerUtils.getPages;

        it("should parse multiple link headers", function () {
            expect(fn(fullHeader)).toEqual({
                next: 3,
                last: 27,
                first: 1,
                prev: 1
            });
        });

    });

});