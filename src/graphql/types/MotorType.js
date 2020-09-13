const {
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { ModelType } = require('./ModelType');
const models = require('../../models');

const MotorType = new GraphQLObjectType({
  name: 'Motor',
  description: 'This represents a MotorType',
  fields: () => ({
    ...id,
    model: {
      type: ModelType,
      resolve: async (source) => (
        models.Model.findOne({ where: { id: source.modelId }})
      ),
    },
    hp: { type: GraphQLInt },
    ...systemDateTypes,
  }),
});

module.exports = { MotorType };
