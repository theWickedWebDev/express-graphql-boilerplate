const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { ZoneType } = require('./ZoneType');
const models = require('../../models');

const LawnType = new GraphQLObjectType({
  name: 'Lawn',
  description: 'This represents a Lawn',
  fields: () => ({
    ...id,
    name: { type: GraphQLString },
    zones: {
      type: new GraphQLList(ZoneType),
      resolve: async (source) => (
        models.Zone.findAll({ where: { lawnId: source.id }})
      ),
    },
    ...systemDateTypes,
  }),
});

module.exports = { LawnType };
