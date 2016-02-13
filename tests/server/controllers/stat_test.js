var PORT = process.env.PORT || 3001;
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
      location_name: 'United States',
      year: 1990,
      sex: 'male',
      mean: 0.043
    },
    {
      location_id: 102,
      location_name: 'United States',
      year: 1990,
      sex: 'male',
      mean: 0.222
    },
    {
      location_id: 102,
      location_name: 'United States',
      year: 2013,
      sex: 'female',
      mean: 0.34
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
    chai.request('localhost:' + PORT)
      .get('/api/stats')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].location_id).to.eql(102);
        expect(res.body[0].location_name).to.eql('United States');
        done();
      });
  });

  it('should get the average obesity by year and sex for a location by id', function(done) {
    chai.request('localhost:' + PORT)
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
