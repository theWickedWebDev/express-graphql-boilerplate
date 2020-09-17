const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { EquipmentTypeType } = require('./EquipmentTypeType');
const { PowerType } = require('./PowerType');
const { MotorType } = require('./MotorType');
const { ModelType } = require('./ModelType');
const { BladeType } = require('./BladeType');

const models = require('../../models');

const LawnMowerType = new GraphQLObjectType({
  name: 'LawnMower',
  description: 'This represents a LawnMower',
  fields: () => ({
    ...id,
    minimumCutHeight: { type: GraphQLFloat },
    maximumCutHeight: { type: GraphQLFloat },
    cutWidth: { type: GraphQLFloat },
    rideOn: { type: GraphQLBoolean },
    selfPropelled: { type: GraphQLBoolean },
    walkBehind: { type: GraphQLBoolean },
    push: { type: GraphQLBoolean },
    mulching: { type: GraphQLBoolean },
    bagging: { type: GraphQLBoolean },
    sideEjection: { type: GraphQLBoolean },
    frontThrowing: { type: GraphQLBoolean },
    notes: { type: GraphQLString },
    isPublic: { type: GraphQLBoolean },
    type: {
      type: EquipmentTypeType,
      resolve: async (source) => (
        models.EquipmentType.findOne({ where: { id: source.equipmentTypeId }})
      ),
    },
    power: {
      type: PowerType,
      resolve: async (source) => (
        models.Power.findOne({ where: { id: source.powerId }})
      ),
    },
    motor: {
      type: MotorType,
      resolve: async (source) => (
        models.Motor.findOne({ where: { id: source.motorId }})
      ),
    },
    model: {
      type: ModelType,
      resolve: async (source) => (
        models.Model.findOne({ where: { id: source.modelId }})
      ),
    },
    blade: {
      type: BladeType,
      resolve: async (source) => (
        models.Blade.findOne({ where: { id: source.bladeId }})
      ),
    },
    ...systemDateTypes,
  }),
});

module.exports = { LawnMowerType };
