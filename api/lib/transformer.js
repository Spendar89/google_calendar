var util = require('./util');

var Transformer = {

    //Maps items by passing each to util.transformKeys with keysMap:
    transformItemKeys: function(items, keysMap) {
        var keysMap = keysMap || {
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
        return items.map(function(i) {
            return util.transformKeys(keysMap, i);
        }.bind(this));
    }
};

module.exports = Transformer;
