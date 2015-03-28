var request = require('request'),
    querystring = require('querystring'),
    util = require('./util');

function ApiRequest(opts) {
    this.uri = opts.uri;
    this.fields = opts.fields;
    this.params = opts.params;
};

ApiRequest.prototype = {

    // Builds full uri by appending querystring to uri.
    // Accepts opts object for custom uris:
    buildFullUri: function(opts) {
        var opts = opts || {},
            uri = opts.uri || this.uri,
            params = opts.params || this.params,
            fields = opts.fields || this.fields;

        // Converts fields object to valid string format and adds it to params:
        if (fields) {
            params.fields = util.stringifyFields(fields);
        };

        var qs = querystring.stringify(params);

        return uri + '?' + qs;
    },

    // Requests items from remote, transforms them if transformer function is
    // specified, and passes them to callback:
    requestItems: function(transform, callback) {
        this.requestData(function(err, data) {
            if (err) return callback(err);
            var items = data.items || [];
            if (transform) {
                items = transform(items);
            };
            callback(err, items);
        });
    },

    // Requests data from remote and handles errors:
    requestData: function(callback) {
        var uri = this.buildFullUri();
        request.get({
            url: uri,
            json: true
        }, function(err, res, body) {
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
                    type: "client_error",
                    code: res.statusCode,
                    message: res.body
                };
                return callback(error)
            };

            callback(error, body);
        });
    }
};

module.exports = ApiRequest;
