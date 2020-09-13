const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { EquipmentTypeType } = require('./EquipmentTypeType');
const { PowerType } = require('./PowerType');
const models = require('../../models');

const LawnMowerType = new GraphQLObjectType({
  name: 'LawnMower',
  description: 'This represents a LawnMower',
  fields: () => ({
    id,
    name: { type: GraphQLString },
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
    ...systemDateTypes,
  }),
});

module.exports = { LawnMowerType };
