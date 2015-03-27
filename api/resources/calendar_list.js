var Resource = require('./../lib/resource'),
    Transformer = require('./../lib/transformer'),
    transformer = new Transformer({});

function CalendarList(params) {
    this.fields = [{
        'items': [
            'id',
            'summary',
            'colorId',
            'selected',
            'timeZone'
        ]
    }];

    // Assigns a transform function that is called whenever 
    // CalendarList items are retrieved.
    // Turn off by setting this.transform to false:
    this.transform = transformer
        .transformItemKeys
        .bind(transformer);

    this.params = params;
    this.path = '/users/me/calendarList';
};

CalendarList.prototype = Resource;

module.exports = CalendarList;
