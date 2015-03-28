# Google Calendar Api Client

A Node.js client for Google's Calendar API.

## Overview
*Note: The following is an overview of the API-client-portion of the application.  It does not cover routing or authentication.*

##### Resources

API resources are accessed via the GoogleCalendar namespace:

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
successful, `params` must include an `access_token` key and value.

A Resource also accepts an `opts` argument that is used to set its `fields` and 
`transform` attributes. In the event that `opts` is not provided, a resource will fallback to `{RESOURCE_NAME}.transform` and `{RESOURCE_NAME}.fields`:

```js
// Default transform function:
CalendarList.transform = Transformer.transformItemKeys;

// Default CalendarEvents fields:
CalendarList.fields = [{
        'items': [
            'id',
            'summary',
            'colorId',
            'selected',
            'timeZone'
        ]
    }];
```

Lets create a `CalendarList` instance:

```js
var calendarList = new GoogleCalendar.calendarList({access_token: OAUTH_ACCESS_TOKEN})
```

A resource instance makes an API request by calling `get`:

```js
calendarList.get(function(err, data) {
        // Do something with response
});
```

Here's what happens under the hood:

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

##### ApiRequest:

A request is performed by an instance of `ApiRequest`, a resource-agnostic service object, used to request data from provided remotes:

```js
function ApiRequest(opts) {
    this.uri = opts.uri;
    this.fields = opts.fields;
    this.params = opts.params;
};
```

Data can be requested by calling `apiRequest.requestData`:

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
`apiRequest.requestData` makes a request to the url returned by `apiRequest.buildFullUri()`, creates an error object if necessary, and passes the error and/or response data to a callback.

The two resources `CalendarList` and `CalendarEvents` don't interface directly with `apiRequest.requestData`, however.  Rather, they call a wrapper function, `apiRequest.requestItems`:

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

As its name would suggest, `apiRequest.requestItems` is used to request resource item data.  The first thing to note is that `apiRequest.requestItems` receives a `transform` argument, which can either be a function (e.g `resource.transform`), or `false` (to disable). After calling `apiRequest.requestData`, `apiRequest.requestItems` passes `data.items` to the transform function (unless its `false`) before passing the transformed items to the callback.

Now lets take a look at `Transformers`.

##### Transformers

The `Transformer` object serves as a namespace for transform functions:

```js
var Transformer = {
    transformItemKeys: function(items, keysMap) {
        var keysMap = keysMap || {
            "summary": "title",
            "timeZone": "timezone",
            "colorId": "color",
            "organizer": {
                "displayName": "name"
            },
            "attendees": {
                "displayName": "name",
                "responseStatus": "rsvpStatus"
            },
            "locked": "editable"
        };
        return items.map(function(i) {
            return util.transformKeys(keysMap, i);
        }.bind(this));
    }
};
```
A valid transform function takes data as an input and returns a transformed version of the data. If a `resource` has a `transform` attribute, it will be invoked whenever `resource.get` is called to fetch data.
