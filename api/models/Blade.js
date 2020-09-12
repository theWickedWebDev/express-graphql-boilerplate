const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const { systemDateTypes, id, setIdUuid, setUpdatedAt} = require('./mixins');
const tableName = 'blades';

const Blade = sequelize.define('Blade', {
  id,
  value: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  createdBy: {
    type: Sequelize.UUID,
  },
  ...systemDateTypes
}, { tableName });

Blade.beforeCreate(setIdUuid);
Blade.afterUpdate(setUpdatedAt);
module.exports = { Blade: Blade };
