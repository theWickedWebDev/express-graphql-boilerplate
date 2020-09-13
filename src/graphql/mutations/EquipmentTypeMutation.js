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
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { value }) => (
    EquipmentType.create({ value })
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
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id, value }) => {
    const foundEquipmentType = await EquipmentType.findByPk(id);

    if (!foundEquipmentType) {
      throw new Error(`EquipmentType with id: ${id} not found!`);
    } else {
      EquipmentType.update({ value }, { where: { id }});
    }

    return merge(foundEquipmentType, { value });
    },
};

const deleteEquipmentType = {
  type: EquipmentTypeType,
  description: 'The mutation that allows you to delete a existing EquipmentType by Id',
  args: {
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { value }) => {
    const foundEquipmentType = await EquipmentType.findOne({where: { value }});

    if (!foundEquipmentType) {
      throw new Error(`EquipmentType with value: ${value} not found!`);
    }

    await EquipmentType.destroy({ where: { value } });

    return foundEquipmentType;
  },
};

module.exports = {
  createEquipmentType,
  updateEquipmentType,
  deleteEquipmentType,
};
