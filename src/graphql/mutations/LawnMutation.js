const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { LawnType } = require('../types');
const models = require('../../models');

const createLawn = {
  type: LawnType,
  description: 'The mutation that allows you to create a new Lawn',
  args: {
    propertyId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: async (_, args) => {
    const { propertyId, ...newBody } = args;

    const property = await models.Property.findByPk(propertyId);

    if (property) {
      newBody.propertyId = property.id;
    } else {
      throw new Error('Cannot find property with ID: ' + propertyId);
    }

    models.Lawn.create(newBody)
  },
};

const updateLawn = {
  type: LawnType,
  description: 'The mutation that allows you to update an existing Lawn by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id, type }) => {
    const foundLawn = await models.Lawn.findByPk(id);

    if (!foundLawn) {
      throw new Error(`Lawn with id: ${id} not found!`);
    } else {
      models.Lawn.update({ type }, { where: { id }});
    }

    return merge(foundLawn, { type });
  },
};

const deleteLawn = {
  type: LawnType,
  description: 'The mutation that allows you to delete a existing Lawn by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const foundLawn = await models.Lawn.findByPk(id);

    if (!foundLawn) {
      throw new Error(`Lawn with id: ${id} not found!`);
    }

    await models.Lawn.destroy({ where: { id } });

    return foundLawn;
  },
};

module.exports = {
  createLawn,
  updateLawn,
  deleteLawn,
};
