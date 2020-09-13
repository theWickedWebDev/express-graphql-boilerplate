const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { LawnMowerType } = require('../types');
const models = require('../../models');

const lawnMowerQuery = {
  type: new GraphQLList(LawnMowerType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => models.LawnMower.findAll({ where: args }),
};

module.exports = { lawnMowerQuery };
