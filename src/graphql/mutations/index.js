const BladeMutation = require('./BladeMutation');
const PowerMutation = require('./PowerMutation');
const EquipmentTypeMutation = require('./EquipmentTypeMutation');
const UserMutation = require('./UserMutation');
const PropertyMutation = require('./PropertyMutation');

module.exports = {
  ...BladeMutation,
  ...EquipmentTypeMutation,
  ...PowerMutation,
  ...UserMutation,
  ...PropertyMutation,
};
