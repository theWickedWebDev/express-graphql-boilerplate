const {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { TurfType } = require('../types');
const { RatingEnumType } = require('../types/RatingEnumType');
const { SeasonEnumType } = require('../types/SeasonEnumType');
const { Turf } = require('../../models');

const OPTIONAL_ARGS = {
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
};

const createTurf = {
  type: TurfType,
  description: 'The mutation that allows you to create a new Detail',
  args: {
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString),
    },
    ...OPTIONAL_ARGS,
  },
  resolve: (_, args) => Turf.create(args),
};

const updateTurf = {
  type: TurfType,
  description: 'The mutation that allows you to update an existing Detail by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
      allowNull: true,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    ...OPTIONAL_ARGS,
  },
  resolve: async (_, { id, ...rest }) => {
    const foundTurf = await Turf.findByPk(id);
    if (!foundTurf) {
      throw new Error(`Turf not found!`);
    } else {
      Turf.update(rest, { where: { id }})
    }

    return merge(foundTurf, rest);
  },
};

const deleteTurf = {
  type: TurfType,
  description: 'The mutation that allows you to delete a existing Detail by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (id, args) => {
    const foundTurf = await Turf.findOne({ where: args });

    if (!foundTurf) {
      throw new Error(`Turf not found!`);
    }

    await Turf.destroy({ where: args });

    return foundTurf;
  },
};

module.exports = {
  createTurf,
  updateTurf,
  deleteTurf,
};
