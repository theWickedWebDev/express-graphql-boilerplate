const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const EquipmentTypeType = new GraphQLObjectType({
  name: 'EquipmentTypeType',
  description: 'This represents an EquipmentType',
  fields: () => ({
    ...id,
    value: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { EquipmentTypeType };
