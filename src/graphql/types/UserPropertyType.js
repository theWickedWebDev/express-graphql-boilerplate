const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { UserLawnType } = require('./UserLawnType');
const { UserEquipmentType } = require('./UserEquipmentType');
const models = require('../../models');

const UserPropertyType = new GraphQLObjectType({
  name: 'UserProperty',
  description: 'This represents a UserProperty',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    default: { type: GraphQLBoolean },
    line1: { type: GraphQLString },
    line2: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    equipment: {
      type: new GraphQLList(UserEquipmentType),
      resolve: async (source) => (
        models.UserEquipment.findAll({ where: {
          userPropertyId: source.id,
        }})
      ),
    },
    lawns: {
      type: new GraphQLList(UserLawnType),
      resolve: async (source, args, { userId }) => {
        return models.UserLawn.findAll({ where: {
            userPropertyId: source.id,
        }})
      },
    },
    ...systemDateTypes,
  }),
});

module.exports = { UserPropertyType };
