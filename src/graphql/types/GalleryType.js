const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const GalleryTypeType = new GraphQLEnumType({
  name: 'GalleryType',
  values: {
    IMAGE: { value: 'IMAGE' },
    VIDEO: { value: 'VIDEO' },
  }
});

const GalleryType = new GraphQLObjectType({
  name: 'Gallery',
  description: 'This represents a Gallery',
  fields: () => ({
    ...id,
    src: { type: GraphQLString },
    type: { type: GalleryTypeType },
    ...systemDateTypes,
  }),
});

module.exports = { GalleryType, GalleryTypeType };
