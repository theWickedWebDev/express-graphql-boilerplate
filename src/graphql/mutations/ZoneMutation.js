const {
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { ZoneType } = require('../types');
const models = require('../../models');

const responseUnion = require('./responseUnion');
const getErrorResponseUnion = responseUnion.getErrorResponseUnion;
const type = getErrorResponseUnion(ZoneType);

const createZone = {
  type: type,
  description: 'The mutation that allows you to create a new Zone',
  args: {
    userLawnId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString)},
    sqft: { type: GraphQLFloat},
    number: { type: GraphQLInt},
  },
  resolve: async (_, args) => {
    const { userLawnId, ...newBody } = args;

    const lawn = await models.UserLawn.findByPk(userLawnId);

    if (lawn) {
      newBody.userLawnId = lawn.id;
    } else {
      throw new Error('Cannot find UserLawn with ID: ' + userLawnId);
    }

    return models.Zone.create(newBody)
  },
};

const updateZone = {
  type: type,
  description: 'The mutation that allows you to update an existing Zone by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    sqft: { type: GraphQLFloat},
    number: { type: GraphQLInt},
  },
  resolve: async (_, { id, ...rest }) => {
    const foundZone = await models.Zone.findByPk(id);

    if (!foundZone) {
      throw new Error(`Zone with id: ${id} not found!`);
    } else {
      models.Zone.update(rest, { where: { id }});
    }

    return merge(foundZone, rest);
  },
};

const deleteZone = {
  type: type,
  description: 'The mutation that allows you to delete a existing Zone by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const foundZone = await models.Zone.findByPk(id);

    if (!foundZone) {
      throw new Error(`Zone with id: ${id} not found!`);
    }

    await models.Zone.destroy({ where: { id } });

    return foundZone;
  },
};

module.exports = {
  createZone,
  updateZone,
  deleteZone,
};
