const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { EquipmentType } = require('./EquipmentType');

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  description: 'This represents a Property',
  fields: () => ({
    id,
    name: { type: GraphQLString },
    equipment: { type: new GraphQLList(EquipmentType)},
    ...systemDateTypes,
  }),
});

module.exports = { PropertyType };
