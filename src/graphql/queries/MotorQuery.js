const {
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const { MotorType } = require('../types');
const { Motor } = require('../../models');

const motorQuery = {
  type: new GraphQLList(MotorType),
  args: {
    id: { type: GraphQLInt },
    hp: { type: GraphQLInt },
    modelId: { type: GraphQLID },
  },
  resolve: (user, args) => Motor.findAll({ where: args }),
};

module.exports = { motorQuery };
