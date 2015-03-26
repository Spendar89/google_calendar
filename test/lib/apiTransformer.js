
describe("#transformItems()", function() {
    var apiRequest = new ApiRequest(DEFAULT_OPTS);

    it("should transform an array of items", function() {
        var items = [{"summary": "foo"}]
        apiRequest.transformItems(items).should.eql([{"title": "foo"}]);
    });

    it("should handle nested transforms", function() {
        var items = [{"attendees": {"displayName": "foo"}}]
        apiRequest.transformItems(items).should.eql([{"attendees": {"name": "foo"}}]);
    });

    it("should do nothing to unspecified keys", function() {
        var items = [{"foo": "bar"}]
        apiRequest.transformItems(items).should.eql([{"foo": "bar"}]);
    });

});

it("should perform custom key transforms", function(done) {
    var opts = DEFAULT_OPTS;
    opts.keysMap = {"oldKey": "newKey"};
    var apiRequest = new ApiRequest(opts);
    API.reply(200, {"items": [{"oldKey": "bar"}]});
    apiRequest.requestItems(true, function(err, data) {
        data.should.eql([{newKey: "bar"}]);
        done();
    });
});
