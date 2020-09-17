/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const bcryptSevice = require('../services/bcrypt.service');

const {
  systemDateTypes,
  id,
  setUpdatedAt,
  createdBy,
} = require('./mixins');

const sequelize = require('../../config/database');
const { UserProperty } = require('./UserProperty');
const { Gallery } = require('./Gallery');

const hooks = {
  beforeCreate(user) {
    // eslint-disable-line no-param-reassign
    user.id = uuid();
    user.password = bcryptSevice().password(user);
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  id,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: { type: Sequelize.STRING },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  ...createdBy,
  ...systemDateTypes,
}, { hooks, tableName });

User.beforeUpdate(setUpdatedAt);

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

User.hasMany(UserProperty, {
  foreignKey: 'userId',
  constraints: false,
});

User.hasMany(Gallery, {
  foreignKey: 'userId',
  constraints: false,
});

module.exports = { User };
