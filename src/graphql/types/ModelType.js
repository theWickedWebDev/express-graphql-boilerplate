const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');
const { BrandType } = require('./BrandType');

const models = require('../../models');

const ModelType = new GraphQLObjectType({
  name: 'Model',
  description: 'This represents a ModelType',
  fields: () => ({
    ...id,
    value: { type: GraphQLString },
    brand: {
      type: BrandType,
      resolve: async (source) => (
        models.Brand.findOne({ where: { id: source.brandId }})
      ),
    },
    ...systemDateTypes,
  }),
});

module.exports = { ModelType };
