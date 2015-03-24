var request = require('request')
    , util = require('./util');

// Default mapping of key names that will be changed via the proxy
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

    // Convenience method for generating a url from uri, fields, and accessToken
    // Accepts opts object for custom uris:
    buildFullUri: function (opts) {
        var opts = opts || {}
            , uri = opts.uri || this.uri
            , fields = opts.fields || this.fields
            , accessToken = opts.accessToken || this.accessToken;

        return uri + '?fields=' + fields + '&access_token=' + accessToken;
    },

    // Transforms array of item objects via util#transformKeys:
    transformItems: function(items) {
        return items.map(function(i) {
            return util.transformKeys(this.keysMap, i);
        }.bind(this));
    },

    // Fetches items from remote and transforms them before passing to callback
    // Returns an empty array if fetched data does not have items property:
    fetchItems: function(callback) {
        this.fetchData(function(err, data) {
            if (err) return callback(err);
            var items = data.items || [];
            var transformedItems = this.transformItems(items);
            callback(err, transformedItems);
        }.bind(this))
    },

    // Fetches data from remote:
    fetchData: function(callback) {
        var uri = this.buildFullUri();
        request.get({url: uri, json: true}, function(err, res, body) { 
            var error;

            if (err) {
                error = {
                    type: "request_error",
                    code: 400,
                    message: err.message
                }
                return callback(error);
            };

            if (body.error) {
                error = {
                    type: "google_api_error",
                    code: body.error.code,
                    message: body.error.message
                }
                return callback(error)
            };

            if (res.statusCode != 200) {
                error = {
                    type: "generic_error",
                    code: res.statusCode,
                    message: res.body
                };
                return callback(error)
            };

            callback(error, body);
        })
    }
};

module.exports = CalendarProxy;
