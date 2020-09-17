const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const { UserPropertyType } = require('../types');
const { UserProperty } = require('../../models');

const userPropertyQuery = {
  type: new GraphQLList(UserPropertyType),
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  resolve: (user, args, { userId }) => UserProperty
    .findAll({ where: {...args, userId} }),
};

module.exports = { userPropertyQuery };
