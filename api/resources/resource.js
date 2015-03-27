var ApiRequest = require('./../lib/api_request');

var Resource = {
    baseUrl: 'https://www.googleapis.com/calendar/v3',

    get: function(callback) {

        // opts object used to initialize apiRequest instance::w
        var opts = {
            fields: this.fields,
            params: this.params,
            uri: this.baseUrl + this.path
        };

        // initializes ApiRequest with opt:
        var apiRequest = new ApiRequest(opts);

        // calls apiRequest.requestItems with transform and callback:
        apiRequest.requestItems(this.transform, callback);
    }
};

module.exports = Resource;
