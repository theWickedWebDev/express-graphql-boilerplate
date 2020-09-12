const BladeMutation = require('./BladeMutation');
const PowerMutation = require('./PowerMutation');
const EquipmentTypeMutation = require('./EquipmentTypeMutation');
const UserMutation = require('./UserMutation');

module.exports = {
  ...BladeMutation,
  ...EquipmentTypeMutation,
  ...PowerMutation,
  ...UserMutation,
};
