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
    location: {
      type: DataTypes.STRING
    },
    location_name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },
    age_group_id: {
      type: DataTypes.INTEGER
    },
    age_group: {
      type: DataTypes.STRING
    },
    age_start: {
      type: DataTypes.INTEGER
    },
    age_end: {
      type: DataTypes.INTEGER
    },
    sex_id: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    metric: {
      type: DataTypes.STRING
    },
    measure: {
      type: DataTypes.STRING
    },
    mean: {
      type: DataTypes.DECIMAL
    },
    lower: {
      type: DataTypes.DECIMAL
    },
    upper: {
      type: DataTypes.DECIMAL
    }
  }, {
    classMethods: {
      getUniqueLocations: function(cb) {
        this.findAll({
          attributes: [
            'location_name'
            [sequelize.fn('DISTINCT', sequelize.col('location_id')),'location_id'],
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
            'sex', 'year',
            [sequelize.fn('AVG', sequelize.col('mean')), 'average']
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
