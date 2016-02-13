var fs = require('fs');

module.exports = function(path) {
  return function(cb) {
    console.log('reading file at ' + path + '...');

    fs.readFile(path, function(err, output) {
      if (err) {
        return cb(err);
      }

      var data = output.toString();
      console.log('data read:', data);

      return cb(null, data);
    });
  };
};
