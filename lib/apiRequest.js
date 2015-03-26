var request = require('request')
    , querystring = require('querystring')
    , util = require('./util');

function ApiRequest(opts) {
    this.uri = opts.uri;
    this.fields = opts.fields;
    this.params = opts.params;
};

ApiRequest.prototype = {

    // Convenience method for generating a url from uri, fields, and accessToken
    // Accepts opts object for custom uris:
    buildFullUri: function (opts) {
        var opts = opts || {}
            , uri = opts.uri || this.uri
            , params = opts.params || this.params
            , fields = opts.fields || this.fields;

        if (fields && !params.fields) {
            params.fields = util.stringifyFields(fields);
        };

        var qs =  querystring.stringify(params);

        return uri + '?' + qs;
    },


    // Fetches items from remote and transforms them before passing to callback
    // Returns an empty array if fetched data does not have items property:
    requestItems: function(transformer, callback) {
        this.requestData(function(err, data) {
            if (err) return callback(err);
            var items = data.items || [];
            if (transformer) {
                items = transformer(items);
            };
            callback(err, items);
        })
    },

    // Fetches data from remote:
    requestData: function(callback) {
        var uri = this.buildFullUri();
        request.get({url: uri, json: true}, function(err, res, body) { 
            var error;

            if (err) {
                error = {
                    type: "request_error",
                    code: 400,
                    message: err.message
                }
                return callback(error);
            };

            if (body.error) {
                error = {
                    type: "google_api_error",
                    code: body.error.code,
                    message: body.error.message
                }
                return callback(error)
            };

            if (res.statusCode != 200) {
                error = {
                    type: "generic_error",
                    code: res.statusCode,
                    message: res.body
                };
                return callback(error)
            };

            callback(error, body);
        })
    }
}

module.exports = ApiRequest;
