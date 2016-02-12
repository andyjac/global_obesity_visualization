var _ = require('lodash');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');
var mocha = require('mocha');

describe('parse data test', function() {
  var input = 'location_id,location,location_name,' +
      'year,age_group_id,age_group,age_start,age_end,' +
      'sex_id,sex,unit,metric,measure,mean,lower,upper\n' +
      '160,AFG,Afghanistan,1990,34,2 to 4 yrs,2,4,1,' +
      'male,pct,obese,prevalence,0.068,0.044,0.107\n' +
      '160,AFG,Afghanistan,1990,34,2 to 4 yrs,2,4,1,' +
      'male,pct,overweight,prevalence,0.192,0.136,0.265\r';

  var result = helpers.parseData(input);

  it('should parse out lines of data from a csv with a header of keys', function() {
    expect(_.isArray(result)).to.eql(true);
    expect(result.length).to.eql(2);
  });
});
