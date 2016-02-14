var _ = require('lodash');

module.exports = {
  sanitizeString: function(string) {
    if (string.indexOf('"') > -1) {
      var characters = string.split('');
      var inDoubeQuotes = false;

      return _.map(characters, function(char) {
        if (char === '"') {
          inDoubeQuotes = !inDoubeQuotes;
          return '';
        }

        if (inDoubeQuotes && char === ',') {
          return '|';
        }

        return char;
      }).join('');
    }

    return string;
  },

  parseKeys: function(input) {
    return input
      .split('\n')[0]
      .replace(/\r/g, '')
      .split(',');
  },

  parseData: function(input) {
    return input
      .trim()
      .replace(/\r/g, '')
      .split('\n')
      .slice(1);
  },

  joinPaths: function(pathGroup) {
    return _.reduce(pathGroup, function(arr, paths) {
      arr = arr.concat(paths);

      return arr;
    }, []);
  }
};
