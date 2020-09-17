const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const { UserLawn } = require('./UserLawn');

const tableName = 'zones';

const Zone = sequelize.define('Zone', {
  id,
  name: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  userLawnId: {
    type: Sequelize.UUID,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Zone.beforeCreate(setIdUuid);
Zone.afterUpdate(setUpdatedAt);

module.exports = { Zone };
