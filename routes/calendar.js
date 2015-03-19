var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Im a calendar ' + req.query.accessToken);
})

router.get('/:id', function(req, res) {
    res.send('The id is' + req.params.id);
})

module.exports = router;
