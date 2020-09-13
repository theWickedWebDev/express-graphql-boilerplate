const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const ZoneType = new GraphQLObjectType({
  name: 'Zone',
  description: 'This represents a Zone',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { ZoneType };
