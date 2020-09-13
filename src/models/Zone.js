const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'zones';

const Zone = sequelize.define('Zone', {
  id,
  name: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Zone.beforeCreate(setIdUuid);
Zone.afterUpdate(setUpdatedAt);

module.exports = { Zone };
