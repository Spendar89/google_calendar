var request = require('supertest'),
    rewire = require('rewire'),
    should = require('should'),
    app = require('./../../app'),
    CalendarRouter = rewire('./../../routes/calendar');

app.use('/calendars-test', CalendarRouter);

var GoogleCalendarMock = {
    calendarList: {}
};

var errorMock = {
    code: 403,
    type: 'mock_error',
    message: 'this is a mock error'
};

CalendarRouter.__set__("GoogleCalendar", GoogleCalendarMock);

describe('GET /', function() {
    context("Call to CalendarList.get is successful", function() {
        before(function() {
            GoogleCalendarMock.calendarList.get = function(params, callback) {
                callback(undefined, params);
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
            GoogleCalendarMock.calendarList.get = function(params, callback) {
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
