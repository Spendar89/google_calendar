var express = require('express')
    , router = express.Router()
    , request = require('request');

var baseURI = 'https://www.googleapis.com/calendar/v3' 

router.get('/', function(req, res) {
    // specify the fields we want:
    var fields ='items(id,summary,colorId,selected,timeZone)';
    var accessToken = req.query.accessToken;
    var uri = baseURI + '/users/me/calendarList?fields=' + 
        fields + '&access_token=' + accessToken;

    request.get(uri, function(err, r, body) { 
        var items = JSON.parse(body).items;
        res.json(items);
    });
});

router.get('/:id/events', function(req, res) {
    var fields = 'items(status,locked,organizer(displayName,email,self),' + 
        'recurrence,attendees(displayName,email,responseStatus,self),' + 
        'summary,location,start,end,id)';
    var accessToken = req.query.accessToken;
    var id = req.params.id;
    var uri = baseURI + '/calendars/' + id + 
        '/events?fields=' + fields + 
        '&access_token=' + accessToken;

    request.get(uri, function(err, r, body) {
        var items = JSON.parse(body).items;
        res.json(items)
    });
});

module.exports = router;
