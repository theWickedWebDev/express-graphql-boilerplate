const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { ZoneType } = require('../types');
const models = require('../../models');

const zoneQuery = {
  type: new GraphQLList(ZoneType),
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  resolve: async (source, args, { userId }) => {
    console.log(userId);
    // TODO: Figure out how to query once with associations or update
    //       DB schema
    const lawns = await models.UserLawn.findAll({where: { userId }});
    const userLawnIds = lawns.map(l => l.id);
    console.log(userLawnIds, 'bang');
    return models.Zone.findAll({
      where: {
        ...args,
        userLawnId: userLawnIds,
      }
    });
  },
};

module.exports = { zoneQuery };
