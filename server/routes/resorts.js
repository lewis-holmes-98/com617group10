var express = require('express');
var router = express.Router();
const Resorts = require("../../models/Resort");

router.get('/resort', function(req, res, next) {
  res.render('index', { errors: {} });
});


module.exports = router;