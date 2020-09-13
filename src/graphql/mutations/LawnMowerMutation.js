const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { LawnMowerType } = require('../types');
const models = require('../../models');

const OPTIONAL_LAWN_MOWER_ARGS = {
  power: { type: GraphQLString },
  name: { type: GraphQLString },
  minimumCutHeight: { type: GraphQLFloat },
  maximumCutHeight: { type: GraphQLFloat },
  cutWidth: { type: GraphQLFloat },
  rideOn: { type: GraphQLBoolean },
  selfPropelled: { type: GraphQLBoolean },
  walkBehind: { type: GraphQLBoolean },
  push: { type: GraphQLBoolean },
  mulching: { type: GraphQLBoolean },
  bagging: { type: GraphQLBoolean },
  sideEjection: { type: GraphQLBoolean },
  frontThrowing: { type: GraphQLBoolean },
  notes: { type: GraphQLString },
};

const createLawnMower = {
  type: LawnMowerType,
  description: 'The mutation that allows you to create a new LawnMower',
  args: {
    ...OPTIONAL_LAWN_MOWER_ARGS,
  },
  resolve: async (_, args) => {
    const { power, ...newBody } = args;

    const equipmentType = await models.EquipmentType.findOne({
      where: { value: 'MOWER' },
    });

    if (equipmentType) {
      newBody.equipmentTypeId = equipmentType.id;
    } else {
      throw new Error('Cannot find equipmentType "MOWER"');
    }

    if (power) {
      const powerType = await models.Power.findOne({where: { type: power }});
      if (powerType) {
        newBody.powerId = powerType.id;
      } else {
        throw new Error(
          'Cannot find power of type: ' + power
        );
      }
    }

    models.LawnMower.create(newBody);
  },
};

const updateLawnMower = {
  type: LawnMowerType,
  description: 'The mutation that allows you to update an existing LawnMower by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    ...OPTIONAL_LAWN_MOWER_ARGS,
  },
  resolve: async (_, args) => {
    const { id, ...rest } = args;

    const foundLawnMower = await models.LawnMower.findByPk(id);

    if (!foundLawnMower) {
      throw new Error(`LawnMower with id: ${id} not found!`);
    } else {
      models.LawnMower.update(rest, { where: { id }});
    }

    return merge(foundLawnMower, rest);
  },
};

const deleteLawnMower = {
  type: LawnMowerType,
  description: 'The mutation that allows you to delete a existing LawnMower by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const foundLawnMower = await models.LawnMower.findByPk(id);

    if (!foundLawnMower) {
      throw new Error(`LawnMower with id: ${id} not found!`);
    }

    await models.LawnMower.destroy({ where: { id }});

    return foundLawnMower;
  },
};

module.exports = {
  createLawnMower,
  updateLawnMower,
  deleteLawnMower,
};
