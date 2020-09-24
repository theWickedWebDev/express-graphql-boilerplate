const {
  GraphQLObjectType,
  GraphQlInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const ZoneFeatureType = new GraphQLObjectType({
  name: 'ZoneFeature',
  description: 'This represents a FeatureCollection (Detail.jsjs or MapBox)',
  fields: () => ({
    geometry: {
      type: new GraphQLList(new GraphQLList(GraphQLFloat)),
    },
    order: {
      type: GraphQlInt,
    },
    ...systemDateTypes,
  }),
});

module.exports = { ZoneFeatureType };
