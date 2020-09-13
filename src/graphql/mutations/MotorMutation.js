const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { MotorType } = require('../types');
const { Motor } = require('../../models');
const models = require('../../models');

const createMotor = {
  type: MotorType,
  description: 'The mutation that allows you to create a new Motor',
  args: {
    modelId: { type: new GraphQLNonNull(GraphQLID) },
    hp: { type: GraphQLInt },
  },
  resolve: async (_, args) => {
    const { modelId, ...newBody } = args;

    if (modelId) {
      const model = await models.Model.findOne({where: {id: modelId}});
      if (model) {
        newBody.modelId = model.id;
      } else {
        throw new Error(
          'Cannot find model: ' + modelId
        );
      }
    }

    Motor.create(newBody)
  },
};

const updateMotor = {
  type: MotorType,
  description: 'The mutation that allows you to update an existing Motor by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    hp: { type: GraphQLInt },
  },
  resolve: async (_, { id, ...newBody }) => {
    const foundMotor = await Motor.findByPk(id);

    if (!foundMotor) {
      throw new Error(`Motor with id: ${id} not found!`);
    } else {
      Motor.update(newBody, { where: { id }});
    }

    return merge(foundMotor, newBody);
  },
};

const deleteMotor = {
  type: MotorType,
  description: 'The mutation that allows you to delete a existing Motor by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const foundMotor = await Motor.findByPk(id);

    if (!foundMotor) {
      throw new Error(`Motor with id: ${id} not found!`);
    }

    await Motor.destroy({ where: { id } });

    return foundMotor;
  },
};

module.exports = {
  createMotor,
  updateMotor,
  deleteMotor,
};
