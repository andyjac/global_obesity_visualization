module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    location_id: {
      type: DataTypes.INTEGER
    },
    location_name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.STRING
    },
    mean: {
      type: DataTypes.DECIMAL
    }
  }, {
    classMethods: {
      getUniqueLocations: function(cb) {
        this.findAll({
          attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('location_id')), 'location_id'],
            'location_name'
          ],
          order: [
            ['location_name', 'ASC']
          ]
        }).then(function(stats) {
          cb(null, stats);
          return null;
        }).error(function(err) {
          cb(err);
          return null;
        });
      },

      getAverageByLocation: function(locationId, cb) {
        this.findAll({
          attributes: [
            [sequelize.fn('AVG', sequelize.col('mean')), 'average'],
            'sex', 'year'
          ],
          where: { location_id: locationId },
          group: ['Stat.sex', 'Stat.year'],
          order: [
            ['year', 'ASC']
          ]
        }).then(function(stats) {
          cb(null, stats);
          return null;
        }).catch(function(err) {
          cb(err);
          return null;
        });
      }
    }
  });

  return Stat;
};
