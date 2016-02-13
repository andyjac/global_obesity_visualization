var _ = require('lodash');
var helpers = require('../../lib/helpers');

var keyIsUsed = {
  'location_id': true,
  'location_name': true,
  'year': true,
  'mean': true,
  'sex': true
};

module.exports = function(input, cb) {
  var keys = helpers.parseKeys(input);
  var data = helpers.parseData(input);

  var stats = _.filter(data, function(dataString) {
    var attrString = helpers.sanitizeString(dataString);
    var attrs = attrString.split(',');

    return _.reduce(attrs, function(stat, value, i) {
      var key = keys[i];

      if (keyIsUsed[key]) {
        stat[key] = value.replace(/\|/g, ',');
      }

      return stat;
    }, {});
  });

  cb(null, stats);
};
