// TODO:
/*
  There are a LOT of shared resolver functions here that need to be
  extracted and shared - DRY
 */
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
  modelId: { type: GraphQLID },
  motorId: { type: GraphQLID },
  bladeId: { type: GraphQLID },
  powerId: { type: GraphQLID },
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
    propertyId: { type: new GraphQLNonNull(GraphQLID) },
    ...OPTIONAL_LAWN_MOWER_ARGS,
  },
  resolve: async (_, args) => {
    const { propertyId, modelId, powerId, motorId, bladeId, ...newBody } = args;

    const property = await models.Property.findByPk(propertyId);

    if (property) {
      newBody.propertyId = property.id;
    } else {
      throw new Error('Cannot find property with ID: ' + propertyId);
    }

    const equipmentType = await models.EquipmentType.findOne({
      where: { value: 'MOWER' },
    });

    if (equipmentType) {
      newBody.equipmentTypeId = equipmentType.id;
    } else {
      throw new Error('Cannot find equipmentType "MOWER"');
    }

    if (powerId) {
      const powerType = await models.Power.findByPk(powerId);
      if (powerType) {
        newBody.powerId = powerType.id;
      } else {
        throw new Error(
          'Cannot find power: ' + powerId
        );
      }
    }

    if (modelId) {
      const model = await models.Model.findByPk(modelId);
      if (model) {
        newBody.modelId = model.id;
      } else {
        throw new Error(
          'Cannot find model: ' + modelId
        );
      }
    }

    if (motorId) {
      const motor = await models.Motor.findByPk(motorId);
      if (motor) {
        newBody.motorId = motor.id;
      } else {
        throw new Error(
          'Cannot find motor: ' + motorId
        );
      }
    }

    if (bladeId) {
      const blade = await models.Blade.findByPk(bladeId);
      if (blade) {
        newBody.bladeId = blade.id;
      } else {
        throw new Error(
          'Cannot find blade: ' + bladeId
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
    const { id, modelId, powerId, motorId, ...newBody } = args;

    const foundLawnMower = await models.LawnMower.findByPk(id);

    if (!foundLawnMower) {
      throw new Error(`LawnMower with id: ${id} not found!`);
    } else {
      models.LawnMower.update(newBody, { where: { id }});
    }

    if (powerId) {
      const powerType = await models.Power.findByPk(powerId);
      if (powerType) {
        newBody.powerId = powerType.id;
      } else {
        throw new Error(
          'Cannot find power: ' + powerId
        );
      }
    }

    if (modelId) {
      const model = await models.Model.findByPk(modelId);
      if (model) {
        newBody.modelId = model.id;
      } else {
        throw new Error(
          'Cannot find model: ' + modelId
        );
      }
    }

    if (motorId) {
      const motor = await models.Motor.findByPk(motorId);
      if (motor) {
        newBody.motorId = motor.id;
      } else {
        throw new Error(
          'Cannot find motor: ' + motorId
        );
      }
    }

    return merge(foundLawnMower, newBody);
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
