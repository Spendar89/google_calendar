var request = require('request')
    , util = require('./util');

function CalendarProxy(opts) {
    this.keysMap = opts.keysMap || {
        "summary": "title",
        "timeZone": "timezone",
        "colorId": "color",
        "organizer": {
            "displayName": "name"
        },
        "attendees": {
            "displayName": "name",
            "responseStatus": "rsvpStatus"
        },
        "locked": "editable"
    };
    this.fields = opts.fields;
    this.accessToken = opts.accessToken;
    this.uri = opts.uri;
};

CalendarProxy.prototype = {
    fetchData: function (callback) {
        var keysMap = this.keysMap;
        var uri = this.uri + 
            '?fields=' + this.fields + 
            '&access_token=' + this.accessToken;

        request.get(uri, function(err, res, body) { 
            var body = JSON.parse(body);
            var error = err || body.error;

            if (error) {
                callback(error);
            } else {
                var items = body.items;
                var transformedItems = items.map(function(i) {
                    return util.transformKeys(keysMap, i)
                });
                callback(err, transformedItems);
            };
        });
    }
};

module.exports = CalendarProxy;
