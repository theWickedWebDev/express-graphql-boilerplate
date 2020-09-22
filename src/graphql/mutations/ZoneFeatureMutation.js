const {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const { ZoneFeature } = require('../../models');

const createZoneFeature = {
  type: new GraphQLList(new GraphQLList(GraphQLFloat)),
  args: {
    zoneId: {
      type: GraphQLNonNull(GraphQLID),
    },
    geometry: {
      type: new GraphQLList(new GraphQLList(GraphQLFloat)),
    }
  },
  resolve: async (_, { zoneId, geometry }) => {
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const start = async () => {
      await asyncForEach(geometry, async (coords, order) => {
        const point = { type: 'Point', coordinates: coords};

        await ZoneFeature.create({
          zoneId,
          geometry: point,
          order,
        });
      });
    };

    const returnValue = await start();
    return null;
  },
};

module.exports = {
  createZoneFeature,
};
