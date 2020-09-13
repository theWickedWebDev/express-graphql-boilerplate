const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const { BladeType } = require('../types');
const { Blade } = require('../../models');

const bladeQuery = {
  type: new GraphQLList(BladeType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    value: {
      name: 'value',
      type: GraphQLString,
    },
  },
  resolve: (user, args, context) => Blade.findAll({ where: args }),
};

module.exports = { bladeQuery };
