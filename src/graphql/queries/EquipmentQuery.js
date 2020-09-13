const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { EquipmentType } = require('../types');
const { Equipment } = require('../../models');

const equipmentQuery = {
  type: new GraphQLList(EquipmentType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => {
    return Equipment.findAll({ where: args });
  },
};

module.exports = { equipmentQuery };
