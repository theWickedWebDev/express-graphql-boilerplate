const Sequelize = require('sequelize');
const { systemDateTypes, setUpdatedAt, createdBy, id } = require('./mixins');
const sequelize = require('../../config/database');

const tableName = 'lawn_mowers';

const LawnMower = sequelize.define('LawnMower', {
  id,
  minimumCutHeight: { type: Sequelize.FLOAT },
  maximumCutHeight: { type: Sequelize.FLOAT },
  cutWidth: { type: Sequelize.FLOAT },
  rideOn: { type: Sequelize.BOOLEAN },
  selfPropelled: { type: Sequelize.BOOLEAN },
  walkBehind: { type: Sequelize.BOOLEAN },
  push: { type: Sequelize.BOOLEAN },
  mulching: { type: Sequelize.BOOLEAN },
  bagging: { type: Sequelize.BOOLEAN },
  sideEjection: { type: Sequelize.BOOLEAN },
  frontThrowing: { type: Sequelize.BOOLEAN },
  notes: { type: Sequelize.TEXT },
  isPublic: { type: Sequelize.BOOLEAN },
  ...createdBy,
  ...systemDateTypes,
}, { tableName });

LawnMower.afterUpdate(setUpdatedAt);

module.exports = { LawnMower };
