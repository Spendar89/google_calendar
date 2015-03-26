var ApiRequest = require('./../lib/apiRequest')
    , ApiTransformer = require('./../lib/apiTransformer')
    , config = require('./../config');

var CalendarEvents = {

    // specifies the calendarEvents fields that will be fetched via the api:
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

    getUri: function(calendarId) {
        return config.baseApiUri + '/calendars/' + calendarId + '/events'
    },  

    get: function(params, callback) {

        // generates uri from calendarId param
        var uri = this.getUri(params.calendarId); 

        // deletes calendarId from params since its already included the uri
        delete params.calendarId;

        // opts object used to initialize apiRequest instance::w
        var opts = {
            fields: this.fields, 
            params: params,
            uri: uri
        };

        // initializes ApiRequest and ApiTransformer instances:
        var apiRequest = new ApiRequest(opts);
        var apiTransformer = new ApiTransformer({});

        // transform function to pass to apiRequest.requestItems:
        var transform = apiTransformer.transformItemKeys.bind(apiTransformer);

        // calls apiRequest.requestItems with apiTransformer.transformItemKeys
        // and callback function:
        apiRequest.requestItems(transform, callback);
    } 
};

module.exports = CalendarEvents;
