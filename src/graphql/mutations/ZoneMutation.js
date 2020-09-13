const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { ZoneType } = require('../types');
const models = require('../../models');

const createZone = {
  type: ZoneType,
  description: 'The mutation that allows you to create a new Zone',
  args: {
    lawnId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: async (_, args) => {
    const { lawnId, ...newBody } = args;

    const lawn = await models.Lawn.findByPk(lawnId);

    if (lawn) {
      newBody.lawnId = lawn.id;
    } else {
      throw new Error('Cannot find lawn with ID: ' + lawnId);
    }

    models.Zone.create(newBody)
  },
};

const updateZone = {
  type: ZoneType,
  description: 'The mutation that allows you to update an existing Zone by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
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
  type: ZoneType,
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
