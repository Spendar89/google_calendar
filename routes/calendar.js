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

    calendarProxy.fetchItems(function(data) {
        res.json(data);
    });
});

router.get('/:id/events', function(req, res) {

    var opts = {
        fields: fields, 
        accessToken: req.query.accessToken, 
        uri: baseURI + '/calendars/' + req.params.id + '/events'
    };

    var calendarProxy = new CalendarProxy(opts);

    calendarProxy.fetchItems(function(data) {
        res.json(r);
    });
});

module.exports = router;
