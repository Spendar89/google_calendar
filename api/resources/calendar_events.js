var Resource = require('./resource'),
    Transformer = require('./../lib/transformer');

var CalendarEvents = function(params, opts) {
    var opts = opts || {};

    // this.fields is assigned to custom or default value:
    this.fields = opts.fields || CalendarEvents.fields;

    // Assigns a transform function that is called whenever 
    // CalendarEvent items are retrieved. Turn off by setting to false:
    this.transform = opts.transform || CalendarEvents.transform;

    this.params = params;

    this.path = '/calendars/' + params.calendarId + '/events';

    // Removes calendarId from params obj so it isn't included 
    // in url querystring:
    delete this.params.calendarId;
};

// Default transform function:
CalendarEvents.transform = Transformer.transformItemKeys;

// Default CalendarEvents fields:
CalendarEvents.fields = [{
    'items': [
        'status',
        'locked', {
            'organizer': [
                'displayName',
                'email',
                'self'
            ]
        },
        'recurrence', {
            'attendees': [
                'displayName',
                'email',
                'responseStatus',
                'self'
            ]
        },
        'summary',
        'location',
        'start',
        'end',
        'id'
    ]
}];

CalendarEvents.prototype = Resource;

module.exports = CalendarEvents;
