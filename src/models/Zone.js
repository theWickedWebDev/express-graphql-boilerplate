const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const { UserLawn } = require('./UserLawn');
const { Gallery } = require('./Gallery');

const tableName = 'zones';

const Zone = sequelize.define('Zone', {
  id,
  name: { type: Sequelize.STRING(36) },
  sqft: { type: Sequelize.FLOAT },
  number: { type: Sequelize.INTEGER },
  userLawnId: { type: Sequelize.UUID },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Zone.beforeCreate(setIdUuid);
Zone.afterUpdate(setUpdatedAt);

Zone.belongsTo(Gallery, {
  foreignKey: {
    name: 'galleryId',
    fieldName: 'galleryId',
    type: Sequelize.STRING(100),
  },
  constraints: false,
});

Zone.associate = models => {
  Zone.hasMany(models.ZoneFeature, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
  });
};

Zone.addScope('defaultScope', {
  order: [['number', 'ASC']],
}, { override: true });

module.exports = { Zone };
