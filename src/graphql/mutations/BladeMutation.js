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
    Blade.create({ value })
  ),
};

const updateBlade = {
  type: BladeType,
  description: 'The mutation that allows you to update an existing Blade by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
      allowNull: true,
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
      allowNull: true,
    },
  },
  resolve: async (_, { id, value }) => {
    const foundBlade = await Blade.findByPk(id);

    if (!foundBlade) {
      throw new Error(`Blade not found!`);
    } else {
      Blade.update({ value }, { where: { id }})
    }

    return merge(foundBlade, { value });
  },
};

const deleteBlade = {
  type: BladeType,
  description: 'The mutation that allows you to delete a existing Blade by Id',
  args: {
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (value, args) => {
    const foundBlade = await Blade.findOne({ where: args });

    if (!foundBlade) {
      throw new Error(`Blade not found!`);
    }

    await Blade.destroy({ where: args });

    return foundBlade;
  },
};

module.exports = {
  createBlade,
  updateBlade,
  deleteBlade,
};
