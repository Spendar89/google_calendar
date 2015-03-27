var should = require('should'),
    Util = require('./../../../api/lib/util');

describe("Util", function() {
    describe("#stringifyFields()", function() {
        it("should return a string when fields is an array", function() {
            Util.stringifyFields([]).should.be.type("string");
        });

        it("should return false when fields is not an array", function() {
            Util.stringifyFields("foo").should.be.false;
        });

        it("should return a comma separated string of fields when not nested", function() {
            Util.stringifyFields(["a", "b"]).should.eql("a,b");
        });

        it("should represent nested fields using parentheses", function() {
            Util.stringifyFields([{"a":["b", "c"]}]).should.eql("a(b,c)")
        });

        it("should support deep nesting", function() {
            Util.stringifyFields([{"a":[{"b": [{"c": ["d"]}]}]}]).should.eql("a(b(c(d)))")
        });

        it("should support a mixture of nested and non-nested fields", function() {
            Util.stringifyFields([{"a":["b","c"]}, "d", "e"]).should.eql("a(b,c),d,e")
        });
    });

    describe("#transformKeys()", function() {
        var keysMap = {"a": "c"};
        it("should transform object keys that appear in the keysMap", function() {
            var obj = {"a": "b"};
            Util.transformKeys(keysMap, obj).should.eql({"c": "b"});
        });

        it("should ignore object keys that are not also keysMap keys", function() {
            var obj = {"a": "b", "e": "f"};
            Util.transformKeys(keysMap, obj).should.eql({"c": "b", "e":"f"});
        });

        it("should support nested mappings", function() {
            var keysMap = {"a": {"b": "c"}};
            var obj = {"a": {"b": "d"}};
            Util.transformKeys(keysMap, obj).should.eql({"a": {"c": "d"}});
        });

        it("should respect nested scopes", function() {
            var keysMap = {"a": {"b": "c"}, "b": "e"};
            var obj = {"a": {"b": "d"}, "b": "f"};
            Util.transformKeys(keysMap, obj).should.eql({"a": {"c": "d"}, "e": "f"});
        });

    })
})
