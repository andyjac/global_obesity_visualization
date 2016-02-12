var fs = require('fs');

module.exports = function(path) {
  return function(cb) {
    fs.readFile(path, function(err, data) {
      if (err) {
        return cb(err);
      }

      return cb(null, data.toString());
    });
  };
};
