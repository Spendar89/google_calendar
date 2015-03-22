var assert = require("assert"),
    should = require('should'),
    nock = require('nock'),
    CalendarProxy = require('./../../lib/calendarProxy');

var API = nock('http://foo.com')
    .get('/?fields=fields&access_token=accessToken');

var DEFAULT_OPTS = {
    fields: "fields",
    accessToken: "accessToken",
    uri: "http://foo.com/"
};

describe('CalendarProxy', function() {
    describe('#new()', function() {
        context('with empty options', function() {
            var cp = new CalendarProxy({});

            it('should have the default keysMap', function(done) {
                cp.should.have.property('keysMap');
                done();
            });
        });

        context('with options', function() {
            var cp = new CalendarProxy({
                fields: true,
                accessToken: true,
                uri: true
            });

            it('should have fields, accessToken, and uri properties', function() {
                cp.should.have.property('fields', true);
                cp.should.have.property('accessToken', true);
                cp.should.have.property('uri', true);
            });
        });

    });

    describe("#buildFullUri()", function() {
        var cp = new CalendarProxy(DEFAULT_OPTS);

        it("should build a uri in the correct format without options", function() {
            assert("http://foo.com?fields=fields&access_token=accessToken", cp.buildFullUri())
        });

        it("should build a uri in the correct format with options", function() {
            var opts = {
                fields: "customFields"
            };
            assert("http://foo.com?fields=customFields&access_token=accessToken", cp.buildFullUri(opts))
        });

    });

    describe("#fetchData()", function() {

        var cp = new CalendarProxy(DEFAULT_OPTS);

        it("should access the correct api", function(done) {
            API.reply(200, true);
            cp.fetchData(function(error, data) {
                data.should.be.true;
                done();
            });

        });

        it("should return an error when necessary", function(done) {
            API.reply(200, {error: true});
            cp.fetchData(function(error, data) {
                error.should.be.true;
                done();
            });

        });
    });

    describe("#transformItems()", function() {
        var cp = new CalendarProxy(DEFAULT_OPTS);

        it("should transform an array of items", function() {
            var items = [{"summary": "foo"}]
            cp.transformItems(items).should.eql([{"title": "foo"}]);
        });

        it("should handle nested transforms", function() {
            var items = [{"attendees": {"displayName": "foo"}}]
            cp.transformItems(items).should.eql([{"attendees": {"name": "foo"}}]);
        });

        it("should do nothing to unspecified keys", function() {
            var items = [{"foo": "bar"}]
            cp.transformItems(items).should.eql([{"foo": "bar"}]);
        });

    });

    describe("#fetchItems()", function() {

        var cp = new CalendarProxy(DEFAULT_OPTS);

        it("should return the correct items", function(done) {
            API.reply(200, {"items": [{"foo": "bar"}]});
            cp.fetchItems(function(data) {
                data.should.eql([{foo: "bar"}]);
                done();
            });
        });

        it("should perform the default key transforms", function(done) {
            API.reply(200, {"items": [{"summary": "bar"}]});
            cp.fetchItems(function(data) {
                data.should.eql([{title: "bar"}]);
                done();
            });
        });

        it("should perform custom key transforms", function(done) {
            var opts = DEFAULT_OPTS;
            opts.keysMap = {"oldKey": "newKey"};
            var cp = new CalendarProxy(opts);
            API.reply(200, {"items": [{"oldKey": "bar"}]});
            cp.fetchItems(function(data) {
                data.should.eql([{newKey: "bar"}]);
                done();
            });
        });

        it("should return an empty array when there are no items", function(done) {
            API.reply(200, {"foo": "bar"});
            cp.fetchItems(function(data) {
                data.should.eql([]);
                done();
            });
        });

    });

});
