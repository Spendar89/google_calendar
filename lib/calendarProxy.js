var request = require('request')
    , util = require('./util');

var DEFAULT_KEYSMAP = {
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

function CalendarProxy(opts) {
    this.keysMap = opts.keysMap || DEFAULT_KEYSMAP;
    this.fields = opts.fields;
    this.accessToken = opts.accessToken;
    this.uri = opts.uri;
};

CalendarProxy.prototype = {
    buildFullUri: function (opts) {
        var opts = opts || {},
            uri = opts.uri || this.uri,
            fields = opts.fields || this.fields,
            accessToken = opts.accessToken || this.accessToken;

        return uri + '?fields=' + fields + '&access_token=' + accessToken;
    },

    transformItems: function(items) {
        return items.map(function(i) {
            return util.transformKeys(this.keysMap, i);
        }.bind(this));
    },

    fetchItems: function (callback) {
        this.fetchData(function(error, data) {
            if (error) {
                callback(error);
            } else {
                var items = data.items || [];
                var transformedItems = this.transformItems(items);
                callback(transformedItems);
            };
        }.bind(this))
    },

    fetchData: function (callback) {
        var uri = this.buildFullUri();
        request.get(uri, function(err, res, body) { 
            var data = JSON.parse(body);
            var error = err || data.error;
            callback(error, data)
        });
    }
};

module.exports = CalendarProxy;
