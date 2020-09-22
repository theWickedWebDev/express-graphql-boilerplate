const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

const tableName = 'zone_features';

const { Zone } = require('./Zone');

const ZoneFeature = sequelize.define('ZoneFeatures', {
  id,
  order: {
    type: Sequelize.INTEGER,
  },
  geometry: {
    type: Sequelize.GEOMETRY('POINT', 4326),
  },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

ZoneFeature.beforeCreate(setIdUuid);
ZoneFeature.afterUpdate(setUpdatedAt);

ZoneFeature.belongsTo(Zone, {
  foreignKey: 'zoneId',
  constraints: false,
  onDelete: 'CASCADE'
});

module.exports = { ZoneFeature };
