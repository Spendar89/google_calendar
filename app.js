var express = require('express');
var app = express();
var session = require('express-session');
var calendarRouter = require('./routes/calendar');
var authenticateRouter = require('./routes/authenticate');

app.use(session({secret: 'keyboard cat'}))
app.use('/calendars', calendarRouter);
app.use('/authenticate', authenticateRouter);

app.listen('8000');


