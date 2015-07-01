var truncateBody = require('../src/Lib/truncateBody');

describe("truncateBody", function() {

    it("should do nothing if string length is less than length", function () {
        var input = "this is a test";
        expect(truncateBody(input, input.length)).toEqual(input);
    });

    it("should end with a word and ellipsis if it is cut off", function () {
        var input = "this is a test";
        expect(truncateBody(input, input.length-1)).toEqual("this is a…");
    });

    it("should cut it off based on the length param", function () {
        var input = "this is a test";
        expect(truncateBody(input, 8)).toEqual("this is…");
    });

});