var express = require('express')
    , router = express.Router()
    , CalendarProxy = require('./../lib/calendarProxy');

var baseURI = 'https://www.googleapis.com/calendar/v3';

router.get('/', function(req, res) {

    // TODO: allow fields as object and pass to function that converts to valid string
    var fields = 'items(id,summary,colorId,selected,timeZone)';

    // opts object is passed as argument when initializing CalendarProxy:
    var opts = {
        fields: fields,
        accessToken: req.query.accessToken,
        uri: baseURI + '/users/me/calendarList'
    };

    // Initializes CalendarProxy instance with specified fields, accessToken from
    // url and uri for calendarList resource:
    var calendarProxy = new CalendarProxy(opts);

    // Call fetch calendarProxy#fetchItems and return json response 
    // with fetched data or error:
    calendarProxy.fetchItems(function(data) {
        res.json(data);
    });
});

router.get('/:id/events', function(req, res) {
    var fields = 'items(status,locked,organizer(displayName,email,self),' + 
        'recurrence,attendees(displayName,email,responseStatus,self),' + 
        'summary,location,start,end,id)';

    // opts object is passed as argument when initializing CalendarProxy:
    var opts = {
        fields: fields, 
        accessToken: req.query.accessToken, 
        uri: baseURI + '/calendars/' + req.params.id + '/events'
    };

    // Initializes CalendarProxy instance for events resource:
    var calendarProxy = new CalendarProxy(opts);

    // Fetches event items returns json response:
    calendarProxy.fetchItems(function(data) {
        res.json(r);
    });
});

module.exports = router;
