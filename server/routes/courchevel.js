var express = require('express');
var router = express.Router();

router.get('/Courchevel', function(req, res, next) {
    res.send('courchevel is working properly');
});
module.exports = router;