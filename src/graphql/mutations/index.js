const BladeMutation = require('./BladeMutation');
const PowerMutation = require('./PowerMutation');
const EquipmentTypeMutation = require('./EquipmentTypeMutation');
const UserMutation = require('./UserMutation');
const UserPropertyMutation = require('./UserPropertyMutation');
const UserLawnMutation = require('./UserLawnMutation');
const BrandMutation = require('./BrandMutation');
const ModelMutation = require('./ModelMutation');
const MotorMutation = require('./MotorMutation');
const ZoneMutation = require('./ZoneMutation');
const GalleryMutation = require('./GalleryMutation');
const ZoneFeatureMutation = require('./ZoneFeatureMutation');
const UserEquipmentMutation = require('./UserEquipmentMutation');
const ConditionMutation = require('./ConditionMutation');
const TurfMutation = require('./TurfMutation');

module.exports = {
  ...BladeMutation,
  ...EquipmentTypeMutation,
  ...PowerMutation,
  ...UserMutation,
  ...UserPropertyMutation,
  ...UserLawnMutation,
  ...BrandMutation,
  ...ModelMutation,
  ...MotorMutation,
  ...ZoneMutation,
  ...GalleryMutation,
  ...ZoneFeatureMutation,
  ...UserEquipmentMutation,
  ...ConditionMutation,
  ...TurfMutation,
};
