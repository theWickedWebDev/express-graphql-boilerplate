const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { EquipmentTypeType } = require('../types');
const { EquipmentType } = require('../../models');

const equipmentTypeQuery = {
  type: new GraphQLList(EquipmentTypeType),
  args: {
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  },
  resolve: (user, args) => EquipmentType.findAll({ where: args }),
};

module.exports = { equipmentTypeQuery };
