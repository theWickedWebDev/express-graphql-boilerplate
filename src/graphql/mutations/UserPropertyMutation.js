const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const merge = require('lodash.merge');
const { UserPropertyType } = require('../types');
const { UserProperty } = require('../../models');

const responseUnion = require('./responseUnion');
const getErrorResponseUnion = responseUnion.getErrorResponseUnion;
const mapErrorsToReturnType = responseUnion.mapErrorsToReturnType;
const type = getErrorResponseUnion(UserPropertyType);

const OPTIONAL_ARGS = {
  default: { type: GraphQLBoolean },
  name: { type: GraphQLString },
  line1: { type: GraphQLString },
  line2: { type: GraphQLString },
  city: { type: GraphQLString },
  state: { type: GraphQLString },
  postalCode: { type: GraphQLString },
  country: { type: GraphQLString },
};

const createUserProperty = {
  type: type,
  description: 'The mutation that allows you to create a new Property',
  args: {
    ...OPTIONAL_ARGS,
  },
  resolve: async (_, args, { userId }) => {
    try  {
      return await UserProperty.create({...args, userId});
    } catch (e) {
      return mapErrorsToReturnType(e);
    }
  },
};

const updateUserProperty = {
  type: type,
  description: 'The mutation that allows you to update an existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ...OPTIONAL_ARGS,
  },
  resolve: async (_, args, { userId }) => {
    const foundProperty = await UserProperty.findOne({ where: { id: args.id } });

    if (!foundProperty) {
      throw new Error(`Property not found!`);
    } else {
      if (args.default) {
        UserProperty.update({ default: false }, { where: { userId }})
      }
      UserProperty.update({...args, userId }, { where: { id: args.id, userId }});
    }

    return merge(foundProperty, {...args, userId });
  },
};

const deleteUserProperty = {
  type: type,
  description: 'The mutation that allows you to delete a existing UserProperty by Id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const foundUserProperty = await UserProperty.findOne({ where: { id }});

    if (!foundUserProperty) {
      throw new Error(`UserProperty with id: ${id} not found!`);
    }

    await UserProperty.destroy({ where: { id } });

    return foundUserProperty;
  },
};

module.exports = {
  createUserProperty,
  updateUserProperty,
  deleteUserProperty,
};
