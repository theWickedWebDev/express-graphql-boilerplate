const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { ZoneFeature } = require('../../models');

const ZoneType = new GraphQLObjectType({
  name: 'Zone',
  description: 'This represents a Zone',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    sqft: { type: GraphQLFloat },
    number: { type: GraphQLInt },
    zoneFeatures: {
      type: new GraphQLList(new GraphQLList(GraphQLFloat)),
      resolve: async (source) => {
        const zoneFeatures = await ZoneFeature.findAll({
          where: { zoneId: source.id },
        });

        return zoneFeatures
          .sort((a, b) => a.order - b.order)
          .reduce((acc, cur) => {
            acc.push(cur.geometry.coordinates);
            return acc;
          }, []);
      }
    },
    ...systemDateTypes,
  }),
});

module.exports = { ZoneType };
