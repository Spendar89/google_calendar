var should = require('should')
    , nock = require('nock')
    , querystring = require('querystring')
    , util = require('./../../lib/util')
    , CalendarApi = require('./../../lib/calendarApi');

describe("CalendarApi", function() {
    describe("calendarList", function() {
        var calendarList = CalendarApi.calendarList
            , API = nock(calendarList.getUri())
            , fieldsString = util.stringifyFields(calendarList.fields)
            , qs = querystring.stringify({ access_token: 'accessToken', fields: fieldsString});

        API.get("?" + qs).reply(200, {"items": [{"foo": "bar"}]})

        describe("#get()", function() {
            it("should fetch the correct proxy data", function(done) {
                var params = {access_token: 'accessToken'};

                calendarList.get(params, function(err, data) {
                    data.should.eql([{"foo": "bar"}]);
                    done();
                })
            });
        });
    });

    describe("calendarEvents", function() {
        var calendarEvents = CalendarApi.calendarEvents
            , API = nock(calendarEvents.getUri('calendarId'))
            , fieldsString = util.stringifyFields(calendarEvents.fields)
            , qs = querystring.stringify({ access_token: 'accessToken', fields: fieldsString});

        API.get("?" + qs).reply(200, {"items": [{"foo": "bar"}]});

        describe("#get()", function() {
            it("should fetch the correct proxy data", function(done) {
                var params = {access_token: 'accessToken', calendarId: 'calendarId'};

                calendarEvents.get(params, function(err, data) {
                    data.should.eql([{"foo": "bar"}]);
                    done();
                })
            });
        });
    });
});
