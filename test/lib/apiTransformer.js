var should = require('should')
    , ApiTransformer = require('./../../lib/apiTransformer');

describe("ApiTransformer", function() {

    describe("#new()", function() {
        context("without opts", function() {
            var apiTransformer = new ApiTransformer({});

            it("should have a keysMap property", function() {
                apiTransformer.should.have.property("keysMap");
            });
        });

        context("with keysMap opt", function() {
            var apiTransformer = new ApiTransformer({keysMap: true});

            it("should have a custom keysMap property", function() {
                apiTransformer.should.have.property("keysMap", true);
            });
        });

    });

    describe("#transformItemKeys()", function() {
        var apiTransformer = new ApiTransformer({});

        it("should transform an array of items", function() {
            var items = [{"summary": "foo"}]
            apiTransformer.transformItemKeys(items)
            .should.eql([{"title": "foo"}]);
        });

        it("should handle nested transforms", function() {
            var items = [{"attendees": {"displayName": "foo"}}];
            apiTransformer.transformItemKeys(items)
            .should.eql([{"attendees": {"name": "foo"}}]);
        });

        it("should do nothing to unspecified keys", function() {
            var items = [{"foo": "bar"}];
            apiTransformer.transformItemKeys(items)
            .should.eql([{"foo": "bar"}]);
        });
    });
});

