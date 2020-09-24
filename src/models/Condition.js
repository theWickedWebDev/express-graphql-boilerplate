const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

const tableName = 'conditions';

const Condition = sequelize.define('Condition', {
  id,
  value: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Condition.beforeCreate(setIdUuid);
Condition.afterUpdate(setUpdatedAt);

module.exports = { Condition };
