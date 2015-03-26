var ApiRequest = require('./../lib/apiRequest')
    , ApiTransformer = require('./../lib/apiTransformer')
    , config = require('./../config');

var CalendarList = {

    // specifies the calendarList fields that will be fetched via the api:
    fields: [{
        'items': [
            'id', 
            'summary', 
            'colorId', 
            'selected', 
            'timeZone'
        ]
    }],

    getUri: function() {
        return config.baseApiUri + '/users/me/calendarList';
    },

    get: function(params, callback) {
        var uri = this.getUri(); 

        // opts object used to initialize apiRequest instance::w
        var opts = {
            fields: this.fields,
            params: params,
            uri: this.getUri()
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

module.exports = CalendarList;
