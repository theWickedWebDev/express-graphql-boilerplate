const { BladeType } = require('./BladeType');
const { EquipmentTypeType } = require('./EquipmentTypeType');
const { PowerType } = require('./PowerType');
const { UserType } = require('./UserType');
const { UserPropertyType } = require('./UserPropertyType');
const { UserLawnType } = require('./UserLawnType');
const { BrandType } = require('./BrandType');
const { ModelType } = require('./ModelType');
const { MotorType } = require('./MotorType');
const { ZoneType } = require('./ZoneType');
const GalleryTypes = require('./GalleryType');
const { UserEquipmentType } = require('./UserEquipmentType');
const { ConditionType } = require('./ConditionType');
const { TurfType } = require('./TurfType');
const { RatingEnumType } = require('./RatingEnumType');
const { SeasonEnumType } = require('./SeasonEnumType');

module.exports = {
  BladeType,
  EquipmentTypeType,
  PowerType,
  UserPropertyType,
  UserType,
  UserLawnType,
  BrandType,
  ModelType,
  MotorType,
  ZoneType,
  ...GalleryTypes,
  UserEquipmentType,
  ConditionType,
  TurfType,
  RatingEnumType,
  SeasonEnumType,
};
