const Sequelize = require('sequelize');
const {
  systemDateTypes,
  id,
  setUpdatedAt,
  createdBy,
  setIdUuid,
} = require('./mixins');
const sequelize = require('../../config/database');
const { UserProperty } = require('./UserProperty');
const { User } = require('./User');
const { Gallery } = require('./Gallery');
const { Condition } = require('./Condition');
const { EquipmentType }  = require('./EquipmentType');

const tableName = 'user_equipment';

const UserEquipment = sequelize.define('UserEquipment', {
  id,
  notes: { type: Sequelize.TEXT },
  shared: { type: Sequelize.BOOLEAN },
  name: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

UserEquipment.beforeCreate(setIdUuid);
UserEquipment.beforeUpdate(setUpdatedAt);

UserEquipment.belongsTo(UserProperty, {
  foreignKey: 'userPropertyId',
  constraints: false,
});

UserEquipment.belongsTo(Condition, {
  foreignKey: 'conditionId',
  constraints: false,
});

UserEquipment.belongsTo(EquipmentType, {
  foreignKey: 'equipmentTypeId',
  constraints: false,
});

UserEquipment.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

UserEquipment.belongsTo(Gallery, {
  foreignKey: {
    name: 'galleryId',
    fieldName: 'galleryId',
    type: Sequelize.STRING(100),
  },
  constraints: false,
});

module.exports = { UserEquipment };
