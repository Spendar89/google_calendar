var request = require('supertest'),
    should = require('should'),
    rewire = require('rewire'),
    app = require('./../../app'),
    CalendarRouter = rewire('./../../routers/calendar_router');

CalendarListMock = function(params) {
    this.params = params;
};

CalendarEventsMock = function(params) {
    this.params = params;
};

var ResourceMock = {};

CalendarListMock.prototype = CalendarEventsMock.prototype = ResourceMock;

var GoogleCalendarMock = {
    calendarList: CalendarListMock,
    calendarEvents: CalendarEventsMock
};

var errorMock = {
    code: 403,
    type: 'mock_error',
    message: 'this is a mock error'
};


describe('CalendarRouter', function() {
    before(function() {
        // Sets up a test route for rewired CalendarRouter:
        app.use('/calendars-test', CalendarRouter);

        // Mocks GoogleCalendar object, which allows us to reassign
        // GoogleCalendarMock.calendarList.get as needed:
        CalendarRouter.__set__("GoogleCalendar", GoogleCalendarMock);
    });

    describe('GET /', function() {
        context("Remote api call in CalendarList.get is successful", function() {
            before(function() {
                ResourceMock.get = function(callback) {
                    callback(undefined, this.params);
                };
            });

            it('should respond with a 200', function(done) {
                request(app)
                    .get('/calendars-test')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should pass the accessToken as params to CalendarList.get', function(done) {
                request(app)
                    .get('/calendars-test?accessToken=foobar')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        console.log(res.body)
                        res.body.access_token.should.eql('foobar');
                        done();
                    });
            });
        });

        context("CalendarList.get results in error", function() {
            before(function() {
                ResourceMock.get = function(callback) {
                    callback(errorMock);
                };
            });

            it('should respond with the right status code', function(done) {
                request(app)
                    .get('/calendars-test')
                    .expect(403)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should respond with a json error object', function(done) {
                request(app)
                    .get('/calendars-test')
                    .expect(403)
                    .end(function(err, res) {
                        if (err) return done(err);
                        res.body.should.eql({
                            error: errorMock
                        });
                        done();
                    });
            });
        });

    });


    describe('GET /:id/events', function() {
        context("Remote api call in CalendarEvents.get is successful", function() {
            before(function() {
                ResourceMock.get = function(callback) {
                    callback(undefined, this.params);
                };
            });

            it('should respond with a 200', function(done) {
                request(app)
                    .get('/calendars-test/foo/events')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should pass the accessToken and calendarId as params to CalendarEvents.get', function(done) {
                request(app)
                    .get('/calendars-test/foo/events?accessToken=bar')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        console.log(res.body)
                        res.body.access_token.should.eql('bar');
                        res.body.calendarId.should.eql('foo');
                        done();
                    });
            });
        });

        context("CalendarEvents.get results in error", function() {
            before(function() {
                ResourceMock.get = function(callback) {
                    callback(errorMock);
                };
            });

            it('should respond with the errors status code', function(done) {
                request(app)
                    .get('/calendars-test/foo/events')
                    .expect(errorMock.code)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should respond with a json error object', function(done) {
                request(app)
                    .get('/calendars-test/foo/events')
                    .expect(errorMock.code)
                    .end(function(err, res) {
                        if (err) return done(err);
                        res.body.should.eql({
                            error: errorMock
                        });
                        done();
                    });
            });
        });

    });

    describe('GET /:id/other-resource', function() {
        it('should respond with a 404 status', function(done) {
            request(app)
                .get('/calendars-test/foo/other-resource')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

})
