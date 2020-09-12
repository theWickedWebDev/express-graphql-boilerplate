const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'equipment';

const Equipment = sequelize.define('Equipment', {
  id,
  name: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Equipment.beforeCreate(setIdUuid);
Equipment.afterUpdate(setUpdatedAt);

module.exports = { Equipment };
