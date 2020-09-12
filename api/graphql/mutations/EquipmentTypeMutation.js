const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { EquipmentTypeType } = require('../types');
const { EquipmentType } = require('../../models');

const createEquipmentType = {
  type: EquipmentTypeType,
  description: 'The mutation that allows you to create a new EquipmentType',
  args: {
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { type }) => (
    EquipmentType.create({ type })
  ),
};

const updateEquipmentType = {
  type: EquipmentTypeType,
  description: 'The mutation that allows you to update an existing EquipmentType by Id',
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
    const foundEquipmentType = await EquipmentType.findByPk(id);

    if (!foundEquipmentType) {
      throw new Error(`EquipmentType with id: ${id} not found!`);
    }

    const updatedEquipmentType = merge(foundEquipmentType, { type });

    return foundEquipmentType.update(updatedEquipmentType);
  },
};

const deleteEquipmentType = {
  type: EquipmentTypeType,
  description: 'The mutation that allows you to delete a existing EquipmentType by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (_, { id }) => {
    const foundEquipmentType = await EquipmentType.findByPk(id);

    if (!foundEquipmentType) {
      throw new Error(`EquipmentType with id: ${id} not found!`);
    }

    await EquipmentType.destroy({ where: { id } });

    return foundEquipmentType;
  },
};

module.exports = {
  createEquipmentType,
  updateEquipmentType,
  deleteEquipmentType,
};
