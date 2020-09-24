const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { ZoneType } = require('./ZoneType');
const { TurfType } = require('./TurfType');
const { GalleryType } = require('./GalleryType');

const models = require('../../models');

const UserLawnType = new GraphQLObjectType({
  name: 'UserLawn',
  description: 'This represents a UserLawn',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    turfTypes: {
      type: new GraphQLList(TurfType),
      resolve: async (source) => {
        const userTurfs = await models.UserTurf.findAll({
          where: { userLawnId: source.id }}
        );
        console.log(userTurfs);
        return models.Turf.findAll({
          where: { id: userTurfs.map(ut => ut.turfId )}
        })
      },
    },
    zones: {
      type: new GraphQLList(ZoneType),
      resolve: async (source) => {
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
