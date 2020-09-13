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
  entry.updatedAt = Sequelize.literal('CURRENT_TIMESTAMP');
};

const systemDateTypes = {
  created_at: {
    name: 'createdAt',
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    name: 'updatedAt',
    type: Sequelize.DATE,
  },
};

const createdBy = {
  created_by: {
    name: 'createdBy',
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
