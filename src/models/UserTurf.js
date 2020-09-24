const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'user_turf';

const UserTurf = sequelize.define('UserTurf', {
  id,
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

UserTurf.beforeCreate(setIdUuid);
UserTurf.afterUpdate(setUpdatedAt);

UserTurf.associate = models => {
  UserTurf.belongsTo(models.UserLawn, {
    foreignKey: 'userLawnId',
    constraints: false,
  });

  UserTurf.belongsTo(models.Turf, {
    foreignKey: 'turfId',
    constraints: false,
  });
}

module.exports = { UserTurf };
