const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const { LawnMower } = require('./LawnMower');

const tableName = 'models';

const Model = sequelize.define('Model', {
  id,
  value: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Model.beforeCreate(setIdUuid);
Model.afterUpdate(setUpdatedAt);

Model.hasMany(LawnMower, {
  foreignKey: 'modelId',
  constraints: false,
});

module.exports = { Model };
