const Sequelize = require('sequelize');
const {
  systemDateTypes,
  id,
  setUpdatedAt,
  createdBy,
  setIdUuid,
} = require('./mixins');
const sequelize = require('../../config/database');
const { EquipmentType } = require('./EquipmentType');

const tableName = 'equipment';

const Equipment = sequelize.define('Equipment', {
  id,
  name: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Equipment.beforeCreate(setIdUuid);
Equipment.beforeUpdate(setUpdatedAt);

Equipment.belongsTo(EquipmentType, {
  foreignKey: 'equipmentTypeId',
  constraints: false,
});

module.exports = { Equipment };
