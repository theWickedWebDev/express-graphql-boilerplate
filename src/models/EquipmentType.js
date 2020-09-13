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

EquipmentType.hasMany(LawnMower, {
  foreignKey: 'equipmentTypeId',
  constraints: false,
});

module.exports = { EquipmentType };
