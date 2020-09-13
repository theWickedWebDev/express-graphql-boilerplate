const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const LawnType = new GraphQLObjectType({
  name: 'Lawn',
  description: 'This represents a Lawn',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { LawnType };
