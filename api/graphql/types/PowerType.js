const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const PowerType = new GraphQLObjectType({
  name: 'Power',
  description: 'This represents a Power',
  fields: () => ({
    id,
    type: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { PowerType };
