const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

const { LawnMower } = require('./LawnMower');

const tableName = 'motors';

const Motor = sequelize.define('Motor', {
  id,
  hp: {
    type: Sequelize.INTEGER,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Motor.beforeCreate(setIdUuid);
Motor.afterUpdate(setUpdatedAt);

Motor.hasMany(LawnMower, {
  foreignKey: 'motorId',
  constraints: false,
});

module.exports = { Motor };
