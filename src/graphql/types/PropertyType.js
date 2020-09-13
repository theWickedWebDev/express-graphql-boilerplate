const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { LawnMowerType } = require('./LawnMowerType');

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  description: 'This represents a Property',
  fields: () => ({
    id,
    name: { type: GraphQLString },
    lawnMowers: { type: new GraphQLList(LawnMowerType)},
    ...systemDateTypes,
  }),
});

module.exports = { PropertyType };
