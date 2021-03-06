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
const { UserProperty } = require('./UserProperty');
const { User } = require('./User');
const { Gallery } = require('./Gallery');
const { UserTurf } = require('./UserTurf');

const tableName = 'user_lawns';

const UserLawn = sequelize.define('UserLawn', {
  id,
  name: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

UserLawn.beforeCreate(setIdUuid);
UserLawn.beforeUpdate(setUpdatedAt);

UserLawn.belongsTo(UserProperty, {
  foreignKey: 'userPropertyId',
  constraints: false,
});

UserLawn.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

UserLawn.hasMany(UserTurf, {
  foreignKey: 'userLawnId',
  constraints: false,
});

UserLawn.belongsTo(Gallery, {
  foreignKey: {
    name: 'galleryId',
    fieldName: 'galleryId',
    type: Sequelize.STRING(100),
  },
  constraints: false,
});

module.exports = { UserLawn };
