const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { BrandType } = require('../types');
const { Brand } = require('../../models');

const brandQuery = {
  type: new GraphQLList(BrandType),
  args: {
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  },
  resolve: (user, args) => Brand.findAll({ where: args }),
};

module.exports = { brandQuery };
