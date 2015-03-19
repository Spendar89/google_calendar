var express = require('express');
var router = express.Router();

var baseUri =  'https://accounts.google.com/o/oauth2/auth?'
    , scope = 'https://www.googleapis.com/auth/calendar'
    , redirectUri = 'http://localhost:8000/authenticate/callback'
    , clientId = '769981222617-71a6h6aated5cc15k6ss8sdqfrsndm3r.apps.googleusercontent.com'

router.get('/', function(req, res) {
    res.redirect(
        baseUri + 'scope=' + scope + '&state=authorized&redirect_uri=' 
        + redirectUri + '&response_type=token&client_id=' + clientId
    );
});

//router.get('/:id', function(req, res) {
    //res.send('The id is' + req.params.id);
//})

module.exports = router;
