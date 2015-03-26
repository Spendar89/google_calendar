var express = require('express')
    , router = express.Router()
    , CalendarEvents = require('./../lib/calendarApi/calendarEvents')
    , CalendarList = require('./../lib/calendarApi/calendarList');


router.get('/', function(req, res, next) {
    var accessToken = req.query.accessToken;

    CalendarList.get({access_token: accessToken}, function (err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

router.get('/:id/events', function(req, res, next) {
    var accessToken = req.query.accessToken
        , id = req.params.id;

    CalendarEvents.get({access_token: accessToken, calendarId: id}, function(err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

module.exports = router;
