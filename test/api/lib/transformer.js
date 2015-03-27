var should = require('should'),
    Transformer = require('./../../../api/lib/transformer');

describe("Transformer", function() {

    describe("#transformItemKeys()", function() {

        it("should transform an array of items", function() {
            var items = [{
                "summary": "foo"
            }]
            Transformer
                .transformItemKeys(items)
                .should.eql([{
                    "title": "foo"
                }]);
        });

        it("should handle nested transforms", function() {
            var items = [{
                "attendees": {
                    "displayName": "foo"
                }
            }];
            Transformer
                .transformItemKeys(items)
                .should.eql([{
                    "attendees": {
                        "name": "foo"
                    }
                }]);
        });

        it("should do nothing to unspecified keys", function() {
            var items = [{
                "foo": "bar"
            }];
            Transformer
                .transformItemKeys(items)
                .should.eql([{
                    "foo": "bar"
                }]);
        });
    });
});
