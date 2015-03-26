var should = require('should')
    , nock = require('nock')
    , querystring = require('querystring')
    , util = require('./../../lib/util')
    , CalendarList = require('./../../api/calendarList');

describe("CalendarList", function() {
    var API = nock(CalendarList.getUri());
    var fieldsString = util.stringifyFields(CalendarList.fields);
    var qs = querystring.stringify({ access_token: 'accessToken', fields: fieldsString});

    API.get("?" + qs).reply(200, {"items": [{"foo": "bar"}]})

    describe("#get()", function() {
        it("should fetch the correct calendarList data", function(done) {
            var params = {access_token: 'accessToken'};

            CalendarList.get(params, function(err, data) {
                data.should.eql([{"foo": "bar"}]);
                done();
            });
        });
    });
});
