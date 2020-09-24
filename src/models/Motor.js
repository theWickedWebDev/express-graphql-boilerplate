const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

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

module.exports = { Motor };
