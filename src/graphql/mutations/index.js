const BladeMutation = require('./BladeMutation');
const PowerMutation = require('./PowerMutation');
const EquipmentTypeMutation = require('./EquipmentTypeMutation');
const UserMutation = require('./UserMutation');
const PropertyMutation = require('./PropertyMutation');
const LawnMowerMutation = require('./LawnMowerMutation');
const LawnMutation = require('./LawnMutation');
const BrandMutation = require('./BrandMutation');
const ModelMutation = require('./ModelMutation');
const MotorMutation = require('./MotorMutation');

module.exports = {
  ...BladeMutation,
  ...EquipmentTypeMutation,
  ...PowerMutation,
  ...UserMutation,
  ...PropertyMutation,
  ...LawnMowerMutation,
  ...LawnMutation,
  ...BrandMutation,
  ...ModelMutation,
  ...MotorMutation,
};
