var Resource = require('./resource'),
    Transformer = require('./../lib/transformer');

var CalendarList = function(params, opts) {
    var opts = opts || {}

    // this.fields is assigned to custom or default value:
    this.fields = opts.fields || CalendarList.fields;

    // Assigns a transform function that is called whenever 
    // CalendarList items are retrieved.
    // Turn off by setting to false:
    this.transform = opts.transform || CalendarList.transform; 

    this.params = params;
    this.path = '/users/me/calendarList';
};

CalendarList.prototype = Resource;

// Default transform function:
CalendarList.transform = Transformer.transformItemKeys;

// Default CalendarEvents fields:
CalendarList.fields = [{
        'items': [
            'id',
            'summary',
            'colorId',
            'selected',
            'timeZone'
        ]
    }];

module.exports = CalendarList;
