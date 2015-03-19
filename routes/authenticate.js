var express = require('express')
    , router = express.Router()
    ,  request = require('request');

var baseUri =  'https://accounts.google.com/o/oauth2/auth?'
    , tokenUri = 'https://accounts.google.com/o/oauth2/token'
    , scope = 'https://www.googleapis.com/auth/calendar'
    , redirectUri = 'http://localhost:8000/authenticate/callback'
    , clientId = '769981222617-71a6h6aated5cc15k6ss8sdqfrsndm3r.apps.googleusercontent.com'
    , clientSecret = '9pAII4nYg6zVSUePgVHqm3Ge'

router.get('/', function(req, res) {
    res.redirect(
        baseUri + 'scope=' + scope + '&state=authorized&redirect_uri=' 
        + redirectUri + '&response_type=code&client_id=' + clientId
    );
});

router.get('/callback', function (req, res) {
    request.post(tokenUri, { 
        form: {
            code: req.query.code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        } 
    }, function (err, r, body) {
        var accessToken = JSON.parse(body).access_token;
        res.redirect("/calendars?accessToken=" + accessToken);
    });
});

module.exports = router;
