const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const { TurfType } = require('../types');
const { Turf } = require('../../models');

const turfQuery = {
  type: new GraphQLList(TurfType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
  },
  resolve: (user, args, context) => Turf.findAll({ where: args }),
};

module.exports = { turfQuery };
