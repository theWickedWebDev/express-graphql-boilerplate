const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { LawnType } = require('../types');
const { Lawn } = require('../../models');

const lawnQuery = {
  type: new GraphQLList(LawnType),
  args: {
    id: { type: GraphQLInt },
    propertyId: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: (user, args) => Lawn.findAll({ where: args }),
};

module.exports = { lawnQuery };