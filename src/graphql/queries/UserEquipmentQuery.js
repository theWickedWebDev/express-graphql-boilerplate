const {
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserEquipmentType } = require('../types');
const { UserEquipment } = require('../../models');

const userEquipmentQuery = {
  type: new GraphQLList(UserEquipmentType),
  args: {
    propertyId: { type: GraphQLString },
  },
  resolve: (user, args, { userId }) => {
    return UserEquipment.findAll({
      where: {
        ...args,
        userId,
      }
    });
  },
};

module.exports = { userEquipmentQuery };
