const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'user_properties';

const UserProperty = sequelize.define('UserProperty', {
  id,
  name: {
    type: Sequelize.STRING(36),
  },
  default: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  line1: { type: Sequelize.STRING },
  line2: { type: Sequelize.STRING },
  postalCode: {
    type: Sequelize.STRING,
    name: 'postalCode',
    field: 'postal_code',
  },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  country: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

UserProperty.beforeCreate(setIdUuid);
UserProperty.afterUpdate(setUpdatedAt);

module.exports = { UserProperty };
