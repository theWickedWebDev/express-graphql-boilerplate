const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { PowerType } = require('../types');
const { Power } = require('../../models');

const createPower = {
  type: PowerType,
  description: 'The mutation that allows you to create a new Power',
  args: {
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { type }) => (
    Power.create({ type })
  ),
};

const updatePower = {
  type: PowerType,
  description: 'The mutation that allows you to update an existing Power by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id, type }) => {
    const foundPower = await Power.findByPk(id);

    if (!foundPower) {
      throw new Error(`Power with id: ${id} not found!`);
    } else {
      Power.update({ type }, { where: { id }});
    }

    return merge(foundPower, { type });
  },
};

const deletePower = {
  type: PowerType,
  description: 'The mutation that allows you to delete a existing Power by Id',
  args: {
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { type }) => {
    const foundPower = await Power.findOne({ where: { type }});

    if (!foundPower) {
      throw new Error(`Power with id: ${id} not found!`);
    }

    await Power.destroy({ where: { type } });

    return foundPower;
  },
};

module.exports = {
  createPower,
  updatePower,
  deletePower,
};
