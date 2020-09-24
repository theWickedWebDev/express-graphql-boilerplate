const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'power';

const Power = sequelize.define('Power', {
  id,
  type: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  createdBy: { type: Sequelize.UUID },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Power.beforeCreate(setIdUuid);
Power.afterUpdate(setUpdatedAt);

module.exports = { Power };
