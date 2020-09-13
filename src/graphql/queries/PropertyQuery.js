const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { PropertyType } = require('../types');
const { Property } = require('../../models');

const propertyQuery = {
  type: new GraphQLList(PropertyType),
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
  resolve: (user, args) => Property.findAll({ where: args }),
};

module.exports = { propertyQuery };
