var processMarkdown = require('../src/Lib/processMarkdown');

describe("processMarkdown", function () {

    it("should do nothing if no username is found", function () {
        var input = "this is a test";
        expect(processMarkdown(input)).toEqual(input);
    });

    it("should not be trying to compile markdown", function () {
        var input = "# this is a title";
        expect(processMarkdown(input)).toEqual(input);
    });

    it("should find usernames and turn them into links", function () {
        expect(processMarkdown("this is a @username"))
                      .toEqual("this is a [@username](https://github.com/username)");
    });

    it("should work for multiple usernames", function () {
        expect(processMarkdown("@userA @userB"))
                      .toEqual("[@userA](https://github.com/userA) [@userB](https://github.com/userB)");
    });

    it("should not pick up emails", function () {
        var input = "foo@bar.com";
        expect(processMarkdown(input)).toEqual(input);
    });

    it("should not include periods or punctuation", function () {
        expect(processMarkdown("@user.")).toEqual("[@user](https://github.com/user).");
    });

});