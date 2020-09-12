const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const id = {
  type: Sequelize.UUID,
  allowNull: false,
  primaryKey: true,
  autoIncrement: false,
  unique: true,
  defaultValue: Sequelize.UUIDV4
};

/* YourModel.beforeCreate(setIdUuid); */
const setIdUuid = entry => entry.id = uuid();

/* YourModel.afterUpdate(setIdUuid); */
const setUpdatedAt = entry => entry.updatedAt =
  Sequelize.literal('CURRENT_TIMESTAMP');

const systemDateTypes = {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
};

module.exports = { id, setIdUuid, setUpdatedAt, systemDateTypes };
