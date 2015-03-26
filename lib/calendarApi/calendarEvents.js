var ApiRequest = require('./../apiRequest');
var ApiTransformer = require('./../apiTransformer');
var config = require('./../../config');

var CalendarEvents = {
    getUri: function(calendarId) {
        return config.baseApiUri + '/calendars/' + calendarId + '/events'
    },  

    fields: [{
        'items': [
            'status', 
            'locked', 
            {
                'organizer': [
                    'displayName', 
                    'email', 
                    'self'
                ]
            }, 
            'recurrence', 
            {
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
    }],

    get: function(params, callback) {
        var calendarId = params.calendarId;
        var uri = this.getUri(calendarId); 

        delete params.calendarId;

        var opts = {
            fields: this.fields, 
            params: params,
            uri: uri
        };

        var apiRequest = new ApiRequest(opts);
        var apiTransformer = new ApiTransformer({});
        var transform = apiTransformer.transformItemKeys.bind(apiTransformer);

        apiRequest.requestItems(transform, callback);
    } 
};

module.exports = CalendarEvents;
