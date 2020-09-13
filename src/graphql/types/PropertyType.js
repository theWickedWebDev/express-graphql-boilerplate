const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { LawnMowerType } = require('./LawnMowerType');
const { LawnType } = require('./LawnType');
const models = require('../../models');

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  description: 'This represents a Property',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    lawnMowers: {
      type: new GraphQLList(LawnMowerType),
      resolve: async (source) => (
        models.LawnMower.findAll({ where: { propertyId: source.id }})
      ),
    },
    lawns: {
      type: new GraphQLList(LawnType),
      resolve: async (source) => (
        models.Lawn.findAll({ where: { propertyId: source.id }})
      ),
    },
    ...systemDateTypes,
  }),
});

module.exports = { PropertyType };
