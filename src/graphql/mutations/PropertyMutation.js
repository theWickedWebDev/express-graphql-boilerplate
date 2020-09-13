const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { PropertyType } = require('../types');
const { Property } = require('../../models');

const createProperty = {
  type: PropertyType,
  description: 'The mutation that allows you to create a new Property',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, args) => (
    Property.create(args)
  ),
};

const updateProperty = {
  type: PropertyType,
  description: 'The mutation that allows you to update an existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const foundProperty = await Property.findOne({ where: { id: args.id } });

    if (!foundProperty) {
      throw new Error(`Property not found!`);
    } else {
      Property.update({ name: args.name }, { where: { id: args.id }});
    }

    return merge(foundProperty, { name: args.name });
  },
};

const deleteProperty = {
  type: PropertyType,
  description: 'The mutation that allows you to delete a existing Property by Id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const foundProperty = await Property.findOne({ where: { id }});

    if (!foundProperty) {
      throw new Error(`Property with id: ${id} not found!`);
    }

    await Property.destroy({ where: { id } });

    return foundProperty;
  },
};

module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
};
