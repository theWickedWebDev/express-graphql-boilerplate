const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { ConditionType } = require('./ConditionType');
const { EquipmentTypeType } = require('./EquipmentTypeType');
const { GalleryType } = require('./GalleryType');

const models = require('../../models');

const UserEquipmentType = new GraphQLObjectType({
  name: 'UserEquipment',
  description: 'This represents a UserEquipment',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    notes: { type: GraphQLString },
    shared: { type: GraphQLBoolean },
    condition: {
      type: ConditionType,
      resolve: async (source) => (
        models.Condition.findByPk(source.conditionId)
      ),
    },
    equipmentType: {
      type: EquipmentTypeType,
      resolve: async (source) => (
        models.EquipmentType.findByPk(source.equipmentTypeId)
      ),
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

module.exports = { UserEquipmentType };
