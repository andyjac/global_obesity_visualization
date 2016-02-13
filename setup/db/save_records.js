var async = require('async');
var ProgressBar = require('progress');
var Stat = require('../../models').Stat;

module.exports = function(input, cb) {
  var total = input.length;

  if (process.env.NODE_ENV === 'production') {
    total = 9999;
  }

  var bar = buildProgressBar(total);

  var cargo = async.cargo(function(stats, callback) {
    Stat.bulkCreate(stats)
      .then(function() {
        callback(null);
        return null;
      }).catch(function(err) {
        callback(err);
        return null;
      });
  }, 1000);

  cargo.push(input, function(err) {
    if (err) {
      return cb(err);
    }

    bar.tick();

    if (bar.complete) {
      cb(null);
    }
  });
};

function buildProgressBar(total) {
  return new ProgressBar('  [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: total
  });
}
