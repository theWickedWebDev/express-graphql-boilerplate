const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { RatingEnumType } = require('./RatingEnumType');
const { SeasonEnumType } = require('./SeasonEnumType');

const TurfType = new GraphQLObjectType({
  name: 'Detail',
  description: 'This represents a Detail',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    season: { type: SeasonEnumType },
    shadeTolerant: { type: RatingEnumType },
    heatTolerant: { type: RatingEnumType },
    coldTolerant: { type: RatingEnumType },
    wearResistance: { type: RatingEnumType },
    droughtTolerant: { type: RatingEnumType },
    thatchRisk: { type: GraphQLBoolean },
    inchesWaterNeeded: { type: GraphQLInt },
    daysWeekToWater: { type: GraphQLInt },
    mowHeightMin: { type: GraphQLFloat },
    mowHeightMax: { type: GraphQLFloat },
    phMin: { type: GraphQLFloat },
    phMax: { type: GraphQLFloat },
    fertilizeTimesPerYear: { type: GraphQLInt },
    nitrogenLbPerYear: { type: GraphQLInt },
    characteristics: { type: GraphQLString },
    notes: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { TurfType };
