const Sequelize = require('sequelize');
const {
  systemDateTypes,
  id,
  setUpdatedAt,
  createdBy,
  setIdUuid,
} = require('./mixins');
const sequelize = require('../../config/database');
const { Zone } = require('./Zone');

const tableName = 'lawns';

const Lawn = sequelize.define('Lawn', {
  id,
  name: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });


Lawn.beforeCreate(setIdUuid);
Lawn.beforeUpdate(setUpdatedAt);

Lawn.hasMany(Zone, {
  foreignKey: 'lawnId',
  constraints: false,
});

module.exports = { Lawn };
