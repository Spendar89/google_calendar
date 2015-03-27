var express = require('express'),
    router = express.Router(),
    util = require('./../api/lib/util'),
    GoogleCalendar = require('./../api/google_calendar');

router.get('/', function(req, res, next) {
    var accessToken = req.query.accessToken;

    req.p = {
        access_token: accessToken
    };

    // Sets the calendarList api resource name on req obj:
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

    // Sets the calendarEvents api resource name on req obj:
    req.resource = 'calendarEvents';
    next();
});

router.use(function(req, res, next) {
    // Sets resource client based on req.resource:
    var Resource = GoogleCalendar[req.resource];

    // If no resource client exists for route, create 404 error object and 
    // skip to error response handler:
    if (!Resource) {
        var error = {
            type: "client_error",
            code: 404,
            message: "Unknown Resource"
        }
        return next(error);
    };

    // If resource client exists, call resource.get with params req.p 
    var resource = new Resource(req.p);
    resource.get(function(err, data) {
        err
            ? next(err) // go to error response handler 
            : res.json(data); // respond with resource json data
    });
});

// Error response handler:
router.use(function(err, req, res, next) {
    res.status(err.code).json({
        error: err
    });

});

module.exports = router;
