var _ = require('lodash');
var helpers = require('../../lib/helpers');

module.exports = function(input, cb) {
  var keys = helpers.parseKeys(input);
  var data = helpers.parseData(input);

  var stats = _.map(data, function(dataString) {
    var attrString = helpers.sanitizeString(dataString);
    var attrs = attrString.split(',');

    return _.reduce(attrs, function(stat, value, i) {
      var key = keys[i];
      stat[key] = value.replace(/\|/g, ',');

      return stat;
    }, {});
  });

  cb(null, stats);
};
