const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { ZoneType } = require('./ZoneType');

const { GalleryType } = require('./GalleryType');

const models = require('../../models');

const UserLawnType = new GraphQLObjectType({
  name: 'UserLawn',
  description: 'This represents a UserLawn',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    zones: {
      type: new GraphQLList(ZoneType),
      resolve: async (source) => {
        console.log(source.id, 'bang source.id');
        console.log(source.dataValues.id, 'bang source.dataValues.id');
        return models.Zone.findAll({
          where: { userLawnId: source.id }}
        )
      },
    },
    image: {
      type: GalleryType,
      resolve: async (source) => (
        models.Gallery.findByPk(source.galleryId)
      ),
    },
    ...systemDateTypes,
  }),
});

module.exports = { UserLawnType };
