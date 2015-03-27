var should = require('should'),
    Transformer = require('./../../../api/lib/transformer'),
    Resource = require('./../../../api/resources/resource'),
    CalendarList = require('./../../../api/resources/calendar_list');

describe("CalendarList", function() {
    describe("#new()", function() {
        context("no options", function() {
            var calendarList = new CalendarList({
                "foo": "bar"
            });

            it("should have default path, fields, and transform  properties", function() {
                calendarList.should.have.property("path", "/users/me/calendarList");
                calendarList.should.have.property("fields", CalendarList.fields);
                calendarList.should.have.property("transform", CalendarList.transform);
            });

            it("should set the params property to params arg", function() {
                calendarList.should.have.property("params", {
                    "foo": "bar"
                });
            });

            it("should inherit from Resource", function() {
                calendarList.__proto__.should.eql(Resource);
            });
        });

        context("with options", function() {
            var opts = {
                fields: true,
                transform: true
            };

            var calendarList = new CalendarList({
                "foo": "bar",
            }, opts);

            it("should have custom fields and transform  properties", function() {
                calendarList.should.have.property("fields", opts.fields);
                calendarList.should.have.property("transform", opts.transform);
            });
        });
    });
});
