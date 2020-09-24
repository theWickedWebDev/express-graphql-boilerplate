const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const tableName = 'equipment_types';

const EquipmentType = sequelize.define('EquipmentType', {
  id,
  value: {
    type: Sequelize.STRING(36),
    unique: true,
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

EquipmentType.beforeCreate(setIdUuid);
EquipmentType.afterUpdate(setUpdatedAt);

module.exports = { EquipmentType };
