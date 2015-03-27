var should = require('should'),
    rewire = require('rewire'),
    Resource = rewire('./../../../api/resources/resource');

var ApiRequestMock = function(opts) {
    this.opts = opts;
};

ApiRequestMock.prototype = {
    requestItems: function(transform, callback) {
        callback(transform, this);
    }
};

describe("Resource", function() {
    before(function() {
        Resource.__set__("ApiRequest", ApiRequestMock);
    });

    describe("#get()", function() {
        Resource.transform = true;
        Resource.fields = "fields";
        Resource.params = "params";
        Resource.path = "/path";

        it("should have a baseUrl property", function(done) {
            Resource.should.have.property("baseUrl");
            done();
        });

        it("should initialize an apiRequest with correct options", function(done) {
            Resource.get(function(transform, apiRequestMock) {
                apiRequestMock.should.have.property("opts", {
                    fields: Resource.fields,
                    params: Resource.params,
                    uri: Resource.baseUrl + Resource.path
                });
                done();
            });
        });

        it("should call apiRequest.requestItems with transform", function(done) {
            Resource.get(function(transform, opts) {
                transform.should.be.true;
                done();
            });
        });
    });
});
