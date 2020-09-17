const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { ModelType } = require('../types');
const { Model, Brand } = require('../../models');

const createModel = {
  type: ModelType,
  description: 'The mutation that allows you to create a new Model',
  args: {
    brandId: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const { brandId, ...newBody } = args;

    const foundBrand = await Brand.findByPk(brandId);

    if (!foundBrand) {
      throw new Error(`Brand: [${brandId}] not found!`);
    } else {
      newBody.brandId = brandId;
    }

    return Model.create(newBody)
  },
};

const updateModel = {
  type: ModelType,
  description: 'The mutation that allows you to update an existing Model by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id, ...rest }) => {
    const foundModel = await Model.findByPk(id);
    if (!foundModel) {
      throw new Error(`Model: [${id}] not found!`);
    } else {
      await Model.update(rest, { where: { id }});
    }

    return merge(foundModel, rest);
  },
};

const deleteModel = {
  type: ModelType,
  description: 'The mutation that allows you to delete a existing Model by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID)},
  },
  resolve: async (_, { id }) => {
    const foundModel = await Model.findByPk(id);

    if (!foundModel) {
      throw new Error(`Model with id: ${id} not found!`);
    }

    await Model.destroy({ where: { id } });

    return foundModel;
  },
};

module.exports = {
  createModel,
  updateModel,
  deleteModel,
};
