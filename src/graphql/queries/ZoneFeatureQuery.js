const {
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');

const { ZoneFeature } = require('../../models');

const zoneFeatureQuery = {
  type: new GraphQLList(new GraphQLList(GraphQLFloat)),
  args: {
    zoneId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (user, { zoneId }) => {

    const zoneFeatures = await ZoneFeature.findAll({
      where: { zoneId }
    });

    return zoneFeatures.reduce((acc, cur) => {
      acc.push(cur.geometry.coordinates);
      return acc;
    }, []);
    },
};

module.exports = { zoneFeatureQuery };
