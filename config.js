// Google Calendar API an OAuth config 
var Config = {
    baseAuthUri:'https://accounts.google.com/o/oauth2/auth?',
    tokenUri: 'https://accounts.google.com/o/oauth2/token',
    scope: 'https://www.googleapis.com/auth/calendar',
    redirectUri: 'http://localhost:8000/authenticate/callback',
    clientId: '',
    clientSecret: ''
}

module.exports = Config;
