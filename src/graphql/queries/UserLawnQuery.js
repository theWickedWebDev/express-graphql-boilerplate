const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserLawnType } = require('../types');
const { UserLawn, UserProperty } = require('../../models');

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
      }
    });
  },
};

module.exports = { userLawnQuery };
