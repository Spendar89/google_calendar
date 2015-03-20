var express = require('express')
    , router = express.Router()
    , CalendarProxy = require('./../lib/calendarProxy');

var baseURI = 'https://www.googleapis.com/calendar/v3';

router.get('/', function(req, res) {
    var fields = 'items(id,summary,colorId,selected,timeZone)';

    var opts = {
        fields: fields,
        accessToken: req.query.accessToken,
        uri: baseURI + '/users/me/calendarList'
    };

    var calendarProxy = new CalendarProxy(opts);

    calendarProxy.fetchData(function(err, data) {
        var r = err || data;
        res.json(r);
    });
});

router.get('/:id/events', function(req, res) {
    var fields = 'items(status,locked,organizer(displayName,email,self),' + 
        'recurrence,attendees(displayName,email,responseStatus,self),' + 
        'summary,location,start,end,id)';

    var opts = {
        fields: fields, 
        accessToken: req.query.accessToken, 
        uri: baseURI + '/calendars/' + req.params.id + '/events'
    };

    var calendarProxy = new CalendarProxy(opts);

    calendarProxy.fetchData(function(err, data) {
        var r = err || data;
        res.json(r);
    });
});

module.exports = router;
