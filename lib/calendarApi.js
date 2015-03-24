var CalendarProxy = require('./calendarProxy');

var baseURI = 'https://www.googleapis.com/calendar/v3';

var CalendarApi = {
    CalendarList: {
        get: function(accessToken, callback) {
            var fields = 'items(id,summary,colorId,selected,timeZone)';

            var opts = {
                fields: fields,
                accessToken: accessToken,
                uri: baseURI + '/users/me/calendarList'
            };

            var calendarProxy = new CalendarProxy(opts);
            calendarProxy.fetchItems(callback);
        }
    },

    CalendarEvents: {
        get: function(accessToken, id, callback) {
            var fields = 'items(status,locked,organizer(displayName,email,self),' + 
                'recurrence,attendees(displayName,email,responseStatus,self),' + 
                'summary,location,start,end,id)';

            var opts = {
                fields: fields, 
                accessToken: accessToken, 
                uri: baseURI + '/calendars/' + id + '/events'
            };

            var calendarProxy = new CalendarProxy(opts);
            calendarProxy.fetchItems(callback);
        } 
    }
}

module.exports = CalendarApi;
