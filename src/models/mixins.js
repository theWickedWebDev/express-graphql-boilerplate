/* eslint-disable no-param-reassign */

const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const id = {
  type: Sequelize.UUID,
  allowNull: false,
  primaryKey: true,
  autoIncrement: false,
  unique: true,
  defaultValue: Sequelize.UUIDV4,
};

/* YourModel.beforeCreate(setIdUuid); */
const setIdUuid = (entry) => {
  entry.id = uuid();
};

/* YourModel.afterUpdate(setIdUuid); */
const setUpdatedAt = (entry) => {
  entry.updated_at = Sequelize.literal('CURRENT_TIMESTAMP');
};

const systemDateTypes = {
  created_at: {
    name: 'created_at',
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    name: 'created_at',
    type: Sequelize.DATE,
  },
};

const createdBy = {
  created_by: {
    name: 'created_by',
    type: Sequelize.UUID,
  },
};

module.exports = {
  id,
  createdBy,
  setIdUuid,
  setUpdatedAt,
  systemDateTypes,
};
