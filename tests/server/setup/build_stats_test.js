var buildStats = require('../../../setup/db/build_stats');
var expect = require('chai').expect;
var mocha = require('mocha');

describe('build stats test', function() {
  var input = 'location_id,location,location_name,' +
      'year,age_group_id,age_group,age_start,age_end,' +
      'sex_id,sex,unit,metric,measure,mean,lower,upper\n' +
      '160,AFG,Afghanistan,1990,34,2 to 4 yrs,2,4,1,' +
      'male,pct,obese,prevalence,0.068,0.044,0.107\n' +
      '102,USA,United States,2000,34,2 to 4 yrs,2,4,1,' +
      'female,pct,overweight,prevalence,0.192,0.136,0.265\n' +
      '102,USA,United States,2010,36,"2 to 19 yrs, age-standardized",' +
      '2,19,1,both,pct,obese,prevalence,0.061,0.049,0.076\n';

  before(function(done) {
    buildStats(input, function(err, stats) {
      if (err) {
        return done(err);
      }

      this.stats = stats;
      done();
    }.bind(this));
  });

  it('should build an array of stats from a csv file', function() {
    expect(this.stats[0].location_id).to.eql('160');
    expect(this.stats[1].location_name).to.eql('United States');
    expect(this.stats[2].sex).to.eql('both');
  });
});
