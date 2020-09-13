const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const BrandType = new GraphQLObjectType({
  name: 'Brand',
  description: 'This represents a BrandType',
  fields: () => ({
    ...id,
    value: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { BrandType };

