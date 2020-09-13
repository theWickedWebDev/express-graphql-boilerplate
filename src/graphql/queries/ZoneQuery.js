const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { ZoneType } = require('../types');
const { Zone } = require('../../models');

const zoneQuery = {
  type: new GraphQLList(ZoneType),
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  resolve: (user, args) => Zone.findAll({ where: args }),
};

module.exports = { zoneQuery };
