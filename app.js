var express = require('express')
    , app = express()
    , session = require('express-session')
    , calendarRouter = require('./routes/calendar')
    , authenticateRouter = require('./routes/authenticate');

app.use(session({secret: 'keyboard cat'}));
app.use('/calendars', calendarRouter);
app.use('/authenticate', authenticateRouter);

app.listen('8000');


