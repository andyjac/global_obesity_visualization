var express = require('express');
var Stat = require('../models').Stat;
var router = express.Router();

router.get('/', function(req, res, next) {
  Stat.getUniqueLocations(function(err, stats) {
    if (err) {
      return next(err);
    }

    res.status(200).json(stats);
  });
});

router.get('/:locationId', function(req, res, next) {
  var id = req.params.locationId;

  Stat.getAverageByLocation(id, function(err, stats) {
    if (err) {
      return next(err);
    }

    res.status(200).json(stats);
  });
});

module.exports = router;
