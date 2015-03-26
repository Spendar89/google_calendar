var util = require('./util');

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

function ApiTransformer(opts) {
    this.keysMap = opts.keysMap || DEFAULT_KEYSMAP;
};

ApiTransformer.prototype = {
    transformItemKeys: function(items) {
        return items.map(function(i) {
            return util.transformKeys(this.keysMap, i);
        }.bind(this));
    }
};

module.exports = ApiTransformer;
