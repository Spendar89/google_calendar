var should = require('should'),
    Transformer = require('./../../../api/lib/transformer'),
    Resource = require('./../../../api/resources/resource'),
    CalendarEvents = require('./../../../api/resources/calendar_events');

describe("CalendarEvents", function() {
    describe("#new()", function() {
        context("no options", function() {
            var calendarEvents = new CalendarEvents({
                "foo": "bar",
                "calendarId": "baz"
            });

            var path = "/calendars/baz/events";

            it("should have default fields and transform  properties", function() {
                calendarEvents.should.have.property("fields", CalendarEvents.fields);
                calendarEvents.should.have.property("transform", CalendarEvents.transform);
            });

            it("should set the path property from params.calendarId", function() {
                calendarEvents.should.have.property("path", path);
            })

            it("should set the params property to params arg minus calendarId", function() {
                calendarEvents.should.have.property("params", {
                    "foo": "bar"
                });
            });

            it("should inherit from Resource", function() {
                calendarEvents.__proto__.should.eql(Resource);
            });
        });

        context("with options", function() {
            var opts = {
                fields: true,
                transform: true
            };

            var calendarEvents = new CalendarEvents({
                "foo": "bar",
                "calendarId": "baz"
            }, opts);

            it("should have custom fields and transform  properties", function() {
                calendarEvents.should.have.property("fields", opts.fields);
                calendarEvents.should.have.property("transform", opts.transform);
            });
        });
    });
});
