const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const merge = require('lodash.merge');
const { GalleryType, GalleryTypeType } = require('../types');
const { Gallery } = require('../../models');

const responseUnion = require('./responseUnion');
const getErrorResponseUnion = responseUnion.getErrorResponseUnion;
const mapErrorsToReturnType = responseUnion.mapErrorsToReturnType;
const type = getErrorResponseUnion(GalleryType);

const createGallery = {
  type: type,
  description: 'The mutation that allows you to create a new Property',
  args: {
    src: { type: GraphQLString },
    type: { type: GalleryTypeType },
  },
  resolve: async (_, args, { userId }) => {
    try  {
      return await Gallery.create({...args, userId});
    } catch (e) {
      return mapErrorsToReturnType(e);
    }
  },
};

const updateGallery = {
  type: type,
  description: 'The mutation that allows you to update an existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    src: { type: GraphQLString },
    type: { type: GalleryTypeType },
  },
  resolve: async (_, args, { userId }) => {
    const foundProperty = await Gallery.findOne({ where: { id: args.id } });

    if (!foundProperty) {
      throw new Error(`Property not found!`);
    } else {
      if (args.default) {
        Gallery.update({ default: false }, { where: { userId }})
      }
      Gallery.update({...args, userId }, { where: { id: args.id, userId }});
    }

    return merge(foundProperty, {...args, userId });
  },
};

const deleteGallery = {
  type: type,
  description: 'The mutation that allows you to delete a existing Gallery by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const foundGallery = await Gallery.findOne({ where: { id }});

    if (!foundGallery) {
      throw new Error(`Gallery with id: ${id} not found!`);
    }

    await Gallery.destroy({ where: { id } });

    return foundGallery;
  },
};

module.exports = {
  createGallery,
  updateGallery,
  deleteGallery,
};
