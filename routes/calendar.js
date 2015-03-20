var express = require('express')
    , router = express.Router()
    , CalendarProxy = require('./../lib/calendarProxy')

var baseURI = 'https://www.googleapis.com/calendar/v3' 

router.get('/', function(req, res) {
    var opts = {
        accessToken: req.query.accessToken,
        baseURI: 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    };
    var calendarProxy = new CalendarProxy(opts);
    calendarProxy.fetchData(function(err, calendarList) {
        res.json(calendarList);
    });
});

router.get('/:id/events', function(req, res) {
    var fields = 'items(status,locked,organizer(displayName,email,self),' + 
        'recurrence,attendees(displayName,email,responseStatus,self),' + 
        'summary,location,start,end,id)';
    var opts = {
        fields: fields, 
        accessToken: req.query.accessToken, 
        baseURI: baseURI + '/calendars/' + req.params.id + '/events'
    };
    var calendarProxy = new CalendarProxy(opts);
    calendarProxy.fetchData(function(err, events) {
        res.json(events)
    })
});

module.exports = router;
