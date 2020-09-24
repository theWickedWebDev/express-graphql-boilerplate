const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { ConditionType } = require('../types');
const { Condition } = require('../../models');

const createCondition = {
  type: ConditionType,
  description: 'The mutation that allows you to create a new condition',
  args: {
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { value }) => (
    Condition.create({ value })
  ),
};

const updateCondition = {
  type: ConditionType,
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
    const foundCondition = await Condition.findByPk(id);

    if (!foundCondition) {
      throw new Error(`Condition not found!`);
    } else {
      Condition.update({ value }, { where: { id }})
    }

    return merge(foundCondition, { value });
  },
};

const deleteCondition = {
  type: ConditionType,
  args: {
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (value, args) => {
    const foundCondition = await Condition.findOne({ where: args });

    if (!foundCondition) {
      throw new Error(`Condition not found!`);
    }

    await Condition.destroy({ where: args });

    return foundCondition;
  },
};

module.exports = {
  createCondition,
  updateCondition,
  deleteCondition,
};
