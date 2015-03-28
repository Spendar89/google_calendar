# Google Calendar Api Client

A Node.js client for Google's Calendar API.

## Overview

##### Resources

API resources are accessed via the the GoogleCalendar namespace:

```js
var GoogleCalendar = require('./api/google_calendar');
```

Currently, there are two supported resources, `CalendarEvents` and `CalendarList`.  Lets take a look at CalendarList:

```js
var CalendarList = function(params, opts) {
    var opts = opts || {}
    this.fields = opts.fields || CalendarList.fields;
    this.transform = opts.transform || CalendarList.transform; 
    this.params = params;
    this.path = '/users/me/calendarList';
};
```

The `params` argument is a basic javascript object. It will be used later on to build the full resource URL. In order for API calls to be
successful, `params` must include an `accessToken` key and value.

A Resource also accepts an `opts` argument that is used to set its `fields` and 
`transform` attributes. In the event that `opts` is not provided, a resource will fallback to `{RESOURCE_NAME}.transform` and `{RESOURCE_NAME}.fields`.

Lets create a `CalendarList` instance:

```js
var calendarList = new GoogleCalendar.calendarList({access_token: OAUTH_ACCESS_TOKEN})
```

A resource instance can make an API request by calling its `get` method:

```js
calendarList.get(function(err, data) {
        // Do something with response
});
```

Here's what's happening under the hood:

```js

get: function(callback) {

        // opts object used to initialize apiRequest instance:
        var opts = {
            fields: this.fields,
            params: this.params,
            uri: this.baseUrl + this.path
        };

        // initializes ApiRequest with opts:
        var apiRequest = new ApiRequest(opts);

        // calls apiRequest.requestItems with transform and callback:
        apiRequest.requestItems(this.transform, callback);
}
```
The request is handled by an instance of `ApiRequest`, which takes us to the next section...

##### ApiRequest:

`ApiRequest` is a resource-agnostic service object used to request data from provided remotes:

```js
function ApiRequest(opts) {
    this.uri = opts.uri;
    this.fields = opts.fields;
    this.params = opts.params;
};
```

Data can be requested by calling `requestData`:

```js

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
```
`requestData` makes a request to the url returned in `apiRequest.buildFullUri()`, creates error objects for multiple types of errors, and passes the error and/or response data to a callback function.

The two resources `CalendarList` and `CalendarEvents` don't interface directly with `requestData`, however.  Rather, they call `apiRequest.requestItems`:

```js
    requestItems: function(transform, callback) {
        this.requestData(function(err, data) {
            if (err) return callback(err);
            var items = data.items || [];
            if (transform) {
                items = transform(items);
            };
            callback(err, items);
        });
    }
```

The first thing to note is that `requestItems` receives a `transform` argument, which can either be a function (such as `resource#transform`), or `false` (to disable). After calling `apiRequest.requestData`, it passes `data.items` to the transform function (unless its `false`) and finally passes the transformed items to the callback.
