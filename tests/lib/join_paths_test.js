var _ = require('lodash');
var mocha = require('mocha');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');

describe('join paths test', function() {
  it('should join multiple arrays of paths', function() {
    var paths = {
      1: ['./path/to/1', './path/to/2'],
      2: ['./path/to/3', './path/to/4'],
      3: ['./path/to/4', './path/to/5']
    };

    var joined = helpers.joinPaths(paths);

    expect(_.isArray(joined)).to.eql(true);
    expect(joined.length).to.eql(6);
  });
});
