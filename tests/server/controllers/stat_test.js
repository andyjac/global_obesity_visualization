var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var mocha = require('mocha');
var models = require('../../../models');
var bulkSave = require('../../test_helpers').bulkSave;
var sequelize = models.sequelize;
var Stat = models.Stat;

chai.use(require('chai-http'));

require('../../../app');

describe('stat controller api test', function() {
  var testData = [
    {
      location_id: 102,
      location: 'USA',
      location_name: 'United States',
      year: 1990,
      age_group_id: 34,
      age_group: '2 to 4 yrs',
      age_start: 2,
      age_end: 4,
      sex_id: 1,
      sex: 'male',
      unit: 'pct',
      metric: 'obese',
      measure: 'prevalence',
      mean: 0.043,
      lower: 0.035,
      upper: 0.052
    },
    {
      location_id: 102,
      location: 'USA',
      location_name: 'United States',
      year: 1990,
      age_group_id: 21,
      age_group: '80+ yrs',
      age_start: 80,
      age_end: 100,
      sex_id: 1,
      sex: 'male',
      unit: 'pct',
      metric: 'obese',
      measure: 'prevalence',
      mean: 0.222,
      lower: 0.188,
      upper: 0.264
    },
    {
      location_id: 102,
      location: 'USA',
      location_name: 'United States',
      year: 2013,
      age_group_id: 12,
      age_group: '35 to 39 yrs',
      age_start: 35,
      age_end: 39,
      sex_id: 2,
      sex: 'female',
      unit: 'pct',
      metric: 'obese',
      measure: 'prevalence',
      mean: 0.34,
      lower: 0.28,
      upper: 0.406
    }
  ];

  before(function(done) {
    bulkSave(Stat, testData, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  after(function(done) {
    sequelize.sync({
      force: true
    }).finally(function() {
      done();
    });
  });

  it('should get an array of all unique locations', function(done) {
    chai.request('localhost:3000')
      .get('/api/stats')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].location_id).to.eql(102)
        expect(res.body[0].location_name).to.eql('United States');
        done();
      });
  });

  it('should get the average obesity by year and sex for a location by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/stats/102')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(2);
        expect(res.body[0].year).to.eql(1990);
        expect(res.body[0].sex).to.eql('male');
        expect(res.body[1].year).to.eql(2013);
        expect(res.body[1].sex).to.eql('female');
        done();
      });
  });
});
