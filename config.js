// Google Calendar API an OAuth config 
var Config = {
    baseUri:'https://accounts.google.com/o/oauth2/auth?',
    tokenUri: 'https://accounts.google.com/o/oauth2/token',
    scope: 'https://www.googleapis.com/auth/calendar',
    redirectUri: 'http://localhost:8000/authenticate/callback',
    clientId: '769981222617-71a6h6aated5cc15k6ss8sdqfrsndm3r.apps.googleusercontent.com',
    clientSecret: '9pAII4nYg6zVSUePgVHqm3Ge'
}

module.exports = Config;
