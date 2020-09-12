const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { BladeType } = require('../types');
const { Blade } = require('../../models');

const createBlade = {
  type: BladeType,
  description: 'The mutation that allows you to create a new Blade',
  args: {
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { value }) => (
    Blade.create({
      value,
    })
  ),
};

const updateBlade = {
  type: BladeType,
  description: 'The mutation that allows you to update an existing Blade by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id, value }) => {
    const foundBlade = await Blade.findByPk(id);

    if (!foundBlade) {
      throw new Error(`Blade with id: ${id} not found!`);
    }

    const updatedBlade = merge(foundBlade, {
      value,
    });

    return foundBlade.update(updatedBlade);
  },
};

const deleteBlade = {
  type: BladeType,
  description: 'The mutation that allows you to delete a existing Blade by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, { id }) => {
    const foundBlade = await Blade.findByPk(id);

    if (!foundBlade) {
      throw new Error(`Blade with id: ${id} not found!`);
    }

    await Blade.destroy({
      where: {
        id,
      },
    });

    return foundBlade;
  },
};

module.exports = {
  createBlade,
  updateBlade,
  deleteBlade,
};
