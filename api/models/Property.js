const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const { Lawn } = require('./Lawn');
const { Equipment } = require('./Equipment');

const tableName = 'properties';

const Property = sequelize.define('Property', {
  id,
  name: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Property.beforeCreate(setIdUuid);
Property.afterUpdate(setUpdatedAt);

Property.hasMany(Lawn, {
  foreignKey: 'propertyId',
  constraints: false,
});

Property.hasMany(Equipment, {
  foreignKey: 'propertyId',
  constraints: false,
});

module.exports = { Property };
