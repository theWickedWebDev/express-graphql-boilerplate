const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { UserEquipmentType } = require('../types');
const models = require('../../models');

const responseUnion = require('./responseUnion');
const getErrorResponseUnion = responseUnion.getErrorResponseUnion;
const type = getErrorResponseUnion(UserEquipmentType);

const OPTIONAL_ARGS = {
  name: { type: GraphQLString },
  notes: { type: GraphQLString },
  conditionId: { type: GraphQLID },
  galleryId: { type: GraphQLID },
  shared: { type: GraphQLBoolean },
};

const createUserEquipment = {
  type: type,
  description: 'The mutation that allows you to create a new UserEquipment',
  args: {
    propertyId: { type: new GraphQLNonNull(GraphQLID) },
    equipmentTypeId: { type: new GraphQLNonNull(GraphQLID) },
    ...OPTIONAL_ARGS
  },
  resolve: async (_, args, { userId }) => {
    const {
      propertyId,
      equipmentTypeId,
      galleryId,
      conditionId,
      ...newBody
    } = args;

    const property = await models.UserProperty.findByPk(propertyId);

    if (property) {
      newBody.userPropertyId = property.id;
    } else {
      throw new Error('Cannot find property with ID: ' + propertyId);
    }

    if (equipmentTypeId) {
      const equipmentType = await models.EquipmentType.findByPk(equipmentTypeId);

      if (equipmentType) {
        newBody.equipmentTypeId = equipmentType.id;
      } else {
        throw new Error('Cannot find equipmentType with ID: ' + equipmentTypeId);
      }
    }

    if (galleryId) {
      const gallery = await models.Gallery.findByPk(galleryId);

      if (gallery) {
        newBody.galleryId = gallery.id;
      } else {
        throw new Error('Cannot find gallery with ID: ' + galleryId);
      }
    }

    if (conditionId) {
      const condition = await models.Condition.findByPk(conditionId);

      if (condition) {
        newBody.conditionId = condition.id;
      } else {
        throw new Error('Cannot find condition with ID: ' + conditionId);
      }
    }

    return models.UserEquipment.create({...newBody, userId})
  },
};

const updateUserEquipment = {
  type: type,
  description: 'The mutation that allows you to update an existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    // Additional Optional Variables
    propertyId: { type: GraphQLID },
    equipmentTypeId: { type: GraphQLID },
    ...OPTIONAL_ARGS
  },
  resolve: async (_, { id, ...newBody }, { userId }) => {
    const found = await models.UserEquipment.findByPk(id);
    if (!found) {
      throw new Error(`Lawn with id: ${id} not found!`);
    }

    await models.UserEquipment.update(newBody, { where: { id, userId }});
    return models.UserEquipment.findByPk(id);
  }
};

const deleteUserEquipment = {
  type: type,
  description: 'The mutation that allows you to delete a existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }, { userId }) => {
    const found = await models.UserEquipment.findByPk(id);

    if (!found) {
      throw new Error(`UserEquipment with id: ${id} not found!`);
    }

    await models.UserEquipment.destroy({ where: { id, userId } });

    return found;
  },
};

module.exports = {
  createUserEquipment,
  updateUserEquipment,
  deleteUserEquipment,
};
