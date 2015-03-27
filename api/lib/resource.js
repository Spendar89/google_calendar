var ApiRequest = require('./api_request');

var Resource = {
    baseUrl: 'https://www.googleapis.com/calendar/v3',

    get: function(callback) {

        // opts object used to initialize apiRequest instance::w
        var opts = {
            fields: this.fields,
            params: this.params,
            uri: this.baseUrl + this.path
        };

        // initializes ApiRequest and Transformer instances:
        var apiRequest = new ApiRequest(opts);


        // calls apiRequest.requestItems with transformer.transformItemKeys
        // and callback function:
        apiRequest.requestItems(this.transform, callback);
    }
};

module.exports = Resource;
