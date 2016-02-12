var async = require('async');
var buildStats = require('./build_stats');
var readFile = require('./read_file');
var saveRecords = require('./save_records');
var sequelize = require('../../models').sequelize;

module.exports = function(fileName) {
  sequelize.sync({
    force: true
  }).then(function() {
    async.waterfall([
      readFile(fileName),
      buildStats,
      saveRecords
    ], function(err) {
      if (err) {
        console.log('\n* ERROR:', err, '\n\nExiting...');
        return process.exit(1);
      }

      process.exit(0);
    });
  });
};
