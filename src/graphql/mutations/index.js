const BladeMutation = require('./BladeMutation');
const PowerMutation = require('./PowerMutation');
const EquipmentTypeMutation = require('./EquipmentTypeMutation');
const UserMutation = require('./UserMutation');
const PropertyMutation = require('./PropertyMutation');
const LawnMowerMutation = require('./LawnMowerMutation');

module.exports = {
  ...BladeMutation,
  ...EquipmentTypeMutation,
  ...PowerMutation,
  ...UserMutation,
  ...PropertyMutation,
  ...LawnMowerMutation,
};
