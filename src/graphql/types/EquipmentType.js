const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const { LawnMowerType } = require('./LawnMowerType');
const { EquipmentTypeType } = require('./EquipmentTypeType');

const EquipmentType = new GraphQLObjectType({
  name: 'Equipment',
  description: 'This represents an Equipment',
  fields: () => ({
    id,
    type: { type: new GraphQLList(EquipmentTypeType) },
    details: { type: new GraphQLList(LawnMowerType) },
    ...systemDateTypes,
  }),
});

module.exports = { EquipmentType };
