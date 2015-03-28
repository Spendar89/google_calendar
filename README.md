# Google Calendar Api Client

A Node.js client for Google's Calendar API.

### Overview

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
