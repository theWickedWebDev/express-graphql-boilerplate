const { BladeType } = require('./BladeType');
const { EquipmentTypeType } = require('./EquipmentTypeType');
const { PowerType } = require('./PowerType');
const { UserType } = require('./UserType');
const { LawnMowerType } = require('./LawnMowerType');
const { UserPropertyType } = require('./UserPropertyType');
const { UserLawnType } = require('./UserLawnType');
const { BrandType } = require('./BrandType');
const { ModelType } = require('./ModelType');
const { MotorType } = require('./MotorType');
const { ZoneType } = require('./ZoneType');
const GalleryTypes = require('./GalleryType');
const { ZoneFeatureType } = require('./ZoneFeatureType');

module.exports = {
  BladeType,
  EquipmentTypeType,
  PowerType,
  UserPropertyType,
  UserType,
  UserLawnType,
  LawnMowerType,
  BrandType,
  ModelType,
  MotorType,
  ZoneType,
  ...GalleryTypes,
};
