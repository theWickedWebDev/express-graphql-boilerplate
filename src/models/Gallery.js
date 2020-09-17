const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

const { User } = require('./index');

const tableName = 'gallery';

const Gallery = sequelize.define('Gallery', {
  id,
  src: { type: Sequelize.STRING(200)},
  type: { type: Sequelize.ENUM('IMAGE', 'VIDEO')},
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Gallery.beforeCreate(setIdUuid);
Gallery.afterUpdate(setUpdatedAt);

Gallery.associate = models => {
  Gallery.belongsTo(User, {
    foreignKey: 'userId',
    constraints: false,
  })
}

module.exports = { Gallery };
