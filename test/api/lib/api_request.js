var assert = require("assert"),
    should = require('should'),
    nock = require('nock'),
    ApiRequest = require('./../../../api/lib/api_request');

nock.enableNetConnect();

var API = nock('http://foo.com')
    .get('/?foo=bar&access_token=accessToken&fields=fields');

var DEFAULT_OPTS = {
    uri: "http://foo.com/",
    fields: ["fields"],
    params: {
        foo: "bar",
        access_token: "accessToken"
    }
};

describe('ApiRequest', function() {
    describe('#new()', function() {
        context('with options', function() {
            var apiRequest = new ApiRequest(DEFAULT_OPTS);

            it('should have fields, accessToken, and uri properties', function() {
                apiRequest.should.have.property('params', DEFAULT_OPTS.params);
                apiRequest.should.have.property('uri', DEFAULT_OPTS.uri);
                apiRequest.should.have.property('fields', DEFAULT_OPTS.fields);
            });
        });

    });

    describe("#buildFullUri()", function() {
        var apiRequest;

        beforeEach(function() {
            apiRequest = new ApiRequest(DEFAULT_OPTS);
        })

        it("should build a uri in the correct format without options", function() {
            var uri = "http://foo.com/?foo=bar&access_token=accessToken&fields=fields";
            apiRequest.buildFullUri().should.eql(uri);
        });

        it("should build a uri in the correct format with options", function() {
            var opts = {
                fields: ["customFields"],
                params: {
                    access_token: "accessToken"
                }
            };
            var url = "http://foo.com/?access_token=accessToken&fields=customFields";
            apiRequest.buildFullUri(opts).should.eql(url);
        });

        it("should build a uri in the correct format with custom params", function() {
            var opts = {
                params: {
                    custom: "param"
                }
            };
            var url = "http://foo.com/?custom=param&fields=fields";
            apiRequest.buildFullUri(opts).should.eql(url);
        });

        it("should handle custom nested fields", function() {
            var opts = {
                fields: ["cf", {
                    "nf": ["f", "b"]
                }]
            };
            var url = "http://foo.com/?foo=bar&access_token=accessToken&fields=cf%2Cnf(f%2Cb)";
            apiRequest.buildFullUri(opts).should.eql(url);
        });

    });

    describe("#requestData()", function() {
        var apiRequest = new ApiRequest(DEFAULT_OPTS);

        it("should access the correct api", function(done) {
            API.reply(200, true);

            apiRequest.requestData(function(error, data) {
                data.should.be.true;
                done();
            });

        });

        it("should return a google api error when necessary", function(done) {
            var googleError = {
                code: true,
                message: true,
                type: "google_api_error"
            };

            API.reply(200, {
                error: {
                    code: true,
                    message: true
                }
            });

            apiRequest.requestData(function(error, data) {
                error.should.eql(googleError);
                done();
            });
        });

        it("should return a client error when necessary", function(done) {
            var genericError = {
                code: 403,
                message: true,
                type: "client_error"
            };

            API.reply(403, true)

            apiRequest.requestData(function(error, data) {
                error.should.eql(genericError);
                done();
            });
        });
    });


    describe("#requestItems()", function() {

        var apiRequest = new ApiRequest(DEFAULT_OPTS);

        it("should return the correct items when no transform is specified", function(done) {
            API.reply(200, {
                "items": [{
                    "foo": "bar"
                }]
            });

            apiRequest.requestItems(false, function(err, data) {
                data.should.eql([{
                    foo: "bar"
                }]);
                done();
            });
        });

        it("should perform a transform when one is specified", function(done) {
            API.reply(200, {
                "items": [{
                    "summary": "bar"
                }]
            });

            var transform = function(items) {
                return true;
            };

            apiRequest.requestItems(transform, function(err, data) {
                data.should.be.true;
                done();
            });
        });

        it("should return an empty array when there are no items", function(done) {
            API.reply(200, {
                "foo": "bar"
            });

            apiRequest.requestItems(false, function(err, data) {
                data.should.eql([]);
                done();
            });
        });

    });

});
