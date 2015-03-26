var ApiRequest = require('./../lib/api_request')
    , Transformer = require('./../lib/transformer')
    , config = require('./../../config');

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

        // initializes ApiRequest and Transformer instances:
        var apiRequest = new ApiRequest(opts);
        var transformer = new Transformer({}); 

        // transform function to pass to apiRequest.requestItems:
        var transform = transformer.transformItemKeys.bind(transformer);

        // calls apiRequest.requestItems with transformer.transformItemKeys
        // and callback function:
        apiRequest.requestItems(transform, callback);
    }
};

module.exports = CalendarList;
