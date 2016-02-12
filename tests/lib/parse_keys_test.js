var _ = require('lodash');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');
var mocha = require('mocha');

describe('parse keys test', function() {
  var input = 'location_id,location,location_name,year,' +
      'age_group_id,age_group,age_start,age_end,sex_id,' +
      'sex,unit,metric,measure,mean,lower,upper';

  var result = helpers.parseKeys(input);

  it('should parse out the top row of keys of a csv into an array', function() {
    expect(_.isArray(result)).to.eql(true);
    expect(result.length).to.eql(16);
  });
});
