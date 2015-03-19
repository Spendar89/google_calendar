var express = require('express');
var app = express();
var calendarRouter = require('./routes/calendar');
var authenticateRouter = require('./routes/authenticate');

app.use('/calendars', calendarRouter);
app.use('/authenticate', authenticateRouter);

app.listen('8000');


