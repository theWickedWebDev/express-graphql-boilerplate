const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'brands';

const { Model } = require('./Model');

const Brand = sequelize.define('Brand', {
  id,
  value: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Brand.beforeCreate(setIdUuid);
Brand.afterUpdate(setUpdatedAt);

Brand.hasMany(Model, {
  foreignKey: 'brandId',
  constraints: false,
});

module.exports = { Brand };
