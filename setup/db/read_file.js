var fs = require('fs');

module.exports = function(path) {
  return function(cb) {
    fs.readFile(path, function(err, output) {
      if (err) {
        return cb(err);
      }

      return cb(null, output.toString());
    });
  };
};
