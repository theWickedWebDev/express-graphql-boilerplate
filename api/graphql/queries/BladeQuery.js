const {
  GraphQLInt,
  GraphQLList,
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
      type: GraphQLInt,
    },
  },
  resolve: (user, args) => Blade.findAll({ where: args }),
};

module.exports = { bladeQuery };
