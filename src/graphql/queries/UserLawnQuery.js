const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserLawnType } = require('../types');
const { UserLawn } = require('../../models');

const userLawnQuery = {
  type: new GraphQLList(UserLawnType),
  args: {
    id: { type: GraphQLID },
    propertyId: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: (user, args, { userId }) => {

    return UserLawn.findAll({
      where: {
        ...args,
        userId,
      }
    });
  },
};

module.exports = { userLawnQuery };
