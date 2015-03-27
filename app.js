var express = require('express')
    , app = express()
    , calendarRouter = require('./routers/calendar_router')
    , authenticateRouter = require('./routers/authenticate_router');

app.use('/calendars', calendarRouter);
app.use('/authenticate', authenticateRouter);

app.listen('8000');

module.exports = app;


