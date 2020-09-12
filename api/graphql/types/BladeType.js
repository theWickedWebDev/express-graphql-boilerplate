const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const BladeType = new GraphQLObjectType({
  name: 'Blade',
  description: 'This represents a Blade',
  fields: () => ({
    id,
    value: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { BladeType: BladeType };
