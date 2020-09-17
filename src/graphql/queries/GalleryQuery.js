const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const { GalleryType, GalleryTypeType } = require('../types');
const { Gallery } = require('../../models');

const galleryQuery = {
  type: new GraphQLList(GalleryType),
  args: {
    id: { type: GraphQLInt },
    src: { type: GraphQLString },
    type: { type: GalleryTypeType },
  },
  resolve: (user, args, { userId }) => Gallery
    .findAll({ where: {...args, userId} }),
};

module.exports = { galleryQuery };
