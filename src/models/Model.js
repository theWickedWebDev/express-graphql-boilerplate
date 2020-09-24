const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const { Motor } = require('./Motor');

const tableName = 'models';

const Model = sequelize.define('Model', {
  id,
  name: {
    type: Sequelize.STRING(30),
  },
  value: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Model.beforeCreate(setIdUuid);
Model.afterUpdate(setUpdatedAt);

Model.hasMany(Motor, {
  foreignKey: 'modelId',
  constraints: false,
});

module.exports = { Model };
