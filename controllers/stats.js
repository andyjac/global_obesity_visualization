var express = require('express');
var Stat = require('../models').Stat;
var router = express.Router();

router.get('/', function(req, res, next) {
  Stat.getAll(function(err, stats) {
    if (err) {
      return next(err);
    }

    res.status(200).json(stats);
  });
});

router.get('/:locationId', function(req, res, next) {
  var locationId = req.params.locationId;

  Stat.getAllByLocation(locationId, function(err, stats) {
    if (err) {
      return next(err);
    }

    res.status(200).json(stats);
  });
});

module.exports = router;
