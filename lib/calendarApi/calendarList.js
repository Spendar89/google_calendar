var ApiRequest = require('./../apiRequest');
var ApiTransformer = require('./../apiTransformer');
var config = require('./../../config');

var CalendarList = {
    getUri: function() {
        return config.baseApiUri + '/users/me/calendarList';
    },

    fields: [{
        'items': [
            'id', 
            'summary', 
            'colorId', 
            'selected', 
            'timeZone'
        ]
    }],

    get: function(params, callback) {
        var uri = this.getUri(); 

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
}

module.exports = CalendarList;
