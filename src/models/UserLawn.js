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

const tableName = 'user_lawns';

const UserLawn = sequelize.define('UserLawn', {
  id,
  name: { type: Sequelize.STRING },
  sqft: { type: Sequelize.INTEGER },
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

UserLawn.belongsTo(Gallery, {
  foreignKey: 'galleryId',
  constraints: false,
});

module.exports = { UserLawn };
