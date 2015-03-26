var express = require('express')
    , router = express.Router()
    , CalendarEvents = require('./../api/calendarEvents')
    , CalendarList = require('./../api/calendarList');


router.get('/', function(req, res, next) {
    var accessToken = req.query.accessToken;
    var params = {access_token: accessToken};

    CalendarList.get(params, function(err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

router.get('/:id/events', function(req, res, next) {
    var accessToken = req.query.accessToken;
    var id = req.params.id;
    var params= {access_token: accessToken, calendarId: id};

    CalendarEvents.get(params, function(err, data){
        err
            ? res.status(err.code).json({error: err})
            : res.json(data);
    });
});

module.exports = router;
