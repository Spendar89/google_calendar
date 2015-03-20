var request = require('request')
    , util = require('./util');

function CalendarProxy(opts) {
    var opts = opts || {};
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
    this.fields = opts.fields || 'items(id,summary,colorId,selected,timeZone)';
    this.accessToken = opts.accessToken;
    this.baseURI = opts.baseURI;
};

CalendarProxy.prototype = {
    fetchData: function (callback) {
        var keysMap = this.keysMap;
        var uri = this.baseURI + 
            '?fields=' + this.fields + 
            '&access_token=' + this.accessToken;
        request.get(uri, function(err, r, body) { 
            if (err) return callback(err)
            var items = JSON.parse(body).items;
            var transformedItems = items.map(function(i) {
                return util.transformKeys(keysMap, i)
            });
            callback(err, transformedItems);
        });
    }
};

module.exports = CalendarProxy;
