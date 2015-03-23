var express = require('express')
    , app = express()
    , calendarRouter = require('./routes/calendar')
    , authenticateRouter = require('./routes/authenticate');

app.use('/calendars', calendarRouter);
app.use('/authenticate', authenticateRouter);

app.listen('8000');


