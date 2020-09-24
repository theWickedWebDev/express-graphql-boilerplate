const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const { ConditionType } = require('../types');
const { Condition } = require('../../models');

const conditionQuery = {
  type: new GraphQLList(ConditionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    value: {
      name: 'value',
      type: GraphQLString,
    },
  },
  resolve: () => Condition.findAll(),
};

module.exports = { conditionQuery };
