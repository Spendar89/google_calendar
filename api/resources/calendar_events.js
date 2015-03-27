var Resource = require('./../lib/resource'),
    Transformer = require('./../lib/transformer'),
    transformer = new Transformer({});

function CalendarEvents(params) {
    this.fields = [{
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

    // Assigns a transform function that is called whenever 
    // CalendarEvent items are retrieved.
    // Turn off by setting this.transform to false:
    this.transform = transformer
        .transformItemKeys
        .bind(transformer);

    this.params = params;
    this.path = '/calendars/' + params.calendarId + '/events';

    delete this.params.calendarId;
};

CalendarEvents.prototype = Resource;

module.exports = CalendarEvents;
