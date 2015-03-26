var should = require('should')
    , Transformer = require('./../../../api/lib/transformer');

describe("Transformer", function() {

    describe("#new()", function() {
        context("without opts", function() {
            var transformer = new Transformer({});

            it("should have a keysMap property", function() {
                transformer.should.have.property("keysMap");
            });
        });

        context("with keysMap opt", function() {
            var transformer = new Transformer({keysMap: true});

            it("should have a custom keysMap property", function() {
                transformer.should.have.property("keysMap", true);
            });
        });

    });

    describe("#transformItemKeys()", function() {
        var transformer = new Transformer({});

        it("should transform an array of items", function() {
            var items = [{"summary": "foo"}]
            transformer.transformItemKeys(items)
            .should.eql([{"title": "foo"}]);
        });

        it("should handle nested transforms", function() {
            var items = [{"attendees": {"displayName": "foo"}}];
            transformer.transformItemKeys(items)
            .should.eql([{"attendees": {"name": "foo"}}]);
        });

        it("should do nothing to unspecified keys", function() {
            var items = [{"foo": "bar"}];
            transformer.transformItemKeys(items)
            .should.eql([{"foo": "bar"}]);
        });
    });
});

