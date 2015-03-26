var express = require('express')
    , router = express.Router()
    , request = require('request')
    , config = require('./../config');


// Redirects to google oauth uri, which then redirects to /callback:
router.get('/', function(req, res) {
    res.redirect(
        config.baseAuthUri + 'scope=' + config.scope + '&state=authorized&redirect_uri=' 
        + config.redirectUri + '&response_type=code&client_id=' + config.clientId
    );
});

// Redirected from Google oauth flow with authorization code.
// Posts to tokenUrl with authorization code, obtains a valid access token and
// redirects to /calendars with accessToken:
router.get('/callback', function (req, res) {
    request.post(config.tokenUri, { 
        form: {
            code: req.query.code,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            redirect_uri: config.redirectUri,
            grant_type: 'authorization_code'
        } 
    }, function (err, r, body) {
        var accessToken = JSON.parse(body).access_token;
        res.redirect("/calendars?accessToken=" + accessToken);
    });
});

module.exports = router;
