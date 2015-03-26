var express = require('express'),
    router = express.Router(),
    GoogleCalendar = require('./../api/google_calendar');

router.get('/', function(req, res, next) {
    var accessToken = req.query.accessToken;
    req.p = {
        access_token: accessToken
    };
    req.resource = 'calendarList';
    next();
});

router.get('/:id/events', function(req, res, next) {
    var accessToken = req.query.accessToken;
    var id = req.params.id;
    req.p = {
        access_token: accessToken,
        calendarId: id
    };
    req.resource = 'calendarEvents';
    next();
});

router.use(function(req, res) {
    GoogleCalendar[req.resource]
        .get(req.p, function(err, data) {
            if (err)
                res.status(err.code).json({
                    error: err
                });
            else {
                res.json(data);
            }
        });
});

module.exports = router;
