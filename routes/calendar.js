var express = require('express')
    , router = express.Router()
    , CalendarProxy = require('./../lib/calendarProxy');

var baseURI = 'https://www.googgleapis.com/calendar/v3';

router.get('/', function(req, res, next) {
    // TODO: allow fields as object and pass to function that converts to valid string
    var fields = 'items(id,summary,colorId,selected,timeZone)';

    // opts object is passed as argument when initializing CalendarProxy:
    req.opts = {
        fields: fields,
        accessToken: req.query.accessToken,
        uri: baseURI + '/usersf/me/calendarList'
    };

    next();
});

router.get('/:id/events', function(req, res, next) {
    var fields = 'items(status,locked,organizer(displayName,email,self),' + 
        'recurrence,attendees(displayName,email,responseStatus,self),' + 
        'summary,location,start,end,id)';

    // opts object is passed as argument when initializing CalendarProxy:
    req.opts = {
        fields: fields, 
        accessToken: req.query.accessToken, 
        uri: baseURI + '/calendars/' + req.params.id + '/events'
    };

    next();
});

router.use(function (req, res) {
    // Initializes CalendarProxy instance with specified fields, accessToken from
    // url and uri for calendarList resource:
    var calendarProxy = new CalendarProxy(req.opts);

    // Call fetch calendarProxy#fetchItems and return json response 
    // with fetched data or error:
    calendarProxy.fetchItems(function(err, data) {
        if (err) {
            res
            .status(err.code)
            .json({error: err});
        } else {
            res.json(data);
        };
    });
})

module.exports = router;
