var express = require('express')
    , router = express.Router()
    , CalendarApi = require('./../lib/calendarApi');


router.get('/', function(req, res, next) {
    var accessToken = req.query.accessToken
        , api = CalendarApi.CalendarList;

    api.get(accessToken, function (err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

router.get('/:id/events', function(req, res, next) {
    var accessToken = req.query.accessToken
        , id = req.params.id
        , api = CalendarApi.CalendarEvents;

    api.get(accessToken, function(err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

module.exports = router;
