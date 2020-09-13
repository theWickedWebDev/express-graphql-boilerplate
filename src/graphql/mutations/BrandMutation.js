const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { BrandType } = require('../types');
const { Brand } = require('../../models');

const createBrand = {
  type: BrandType,
  description: 'The mutation that allows you to create a new Brand',
  args: {
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { value }) => (
    Brand.create({ value })
  ),
};

const updateBrand = {
  type: BrandType,
  description: 'The mutation that allows you to update an existing Brand by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id, value }) => {
    const foundBrand = await Brand.findByPk(id);

    if (!foundBrand) {
      throw new Error(`Brand: [${value}] not found!`);
    } else {
      Brand.update({ value }, { where: { id }});
    }

    return merge(foundBrand, { value });
  },
};

const deleteBrand = {
  type: BrandType,
  description: 'The mutation that allows you to delete a existing Brand by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID)},
  },
  resolve: async (_, { id }) => {
    const foundBrand = await Brand.findByPk(id);

    if (!foundBrand) {
      throw new Error(`Brand with id: ${id} not found!`);
    }

    await Brand.destroy({ where: { id } });

    return foundBrand;
  },
};

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
};
