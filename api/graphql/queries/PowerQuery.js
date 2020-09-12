const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { PowerType } = require('../types');
const { Power } = require('../../models');

const powerQuery = {
  type: new GraphQLList(PowerType),
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
  resolve: (user, args) => Power.findAll({ where: args }),
};

module.exports = { powerQuery };
