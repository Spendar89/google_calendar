var should = require('should')
    , nock = require('nock')
    , querystring = require('querystring')
    , util = require('./../../lib/util')
    , CalendarEvents = require('./../../api/calendarEvents');

describe("CalendarEvents", function() {
    var API = nock(CalendarEvents.getUri('calendarId'))
    var fieldsString = util.stringifyFields(CalendarEvents.fields);
    var qs = querystring.stringify({ access_token: 'accessToken', fields: fieldsString});

    API.get("?" + qs).reply(200, {"items": [{"foo": "bar"}]})

    describe("#get()", function() {
        it("should fetch the correct proxy data", function(done) {
            var params = {access_token: 'accessToken', calendarId: 'calendarId'};

            CalendarEvents.get(params, function(err, data) {
                data.should.eql([{"foo": "bar"}]);
                done();
            });
        });
    });
});
