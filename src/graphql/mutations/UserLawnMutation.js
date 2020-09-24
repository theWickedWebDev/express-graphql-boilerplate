const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const merge = require('lodash.merge');

const { UserLawnType } = require('../types');
const models = require('../../models');

const responseUnion = require('./responseUnion');
const getErrorResponseUnion = responseUnion.getErrorResponseUnion;
const type = getErrorResponseUnion(UserLawnType);

const OPTIONAL_ARGS = {
  name: { type: GraphQLString},
  sqft: { type: GraphQLInt },
  galleryId: { type: GraphQLID },
  turfIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID))}
};

const createUserLawn = {
  type: type,
  description: 'The mutation that allows you to create a new UserLawn',
  args: {
    propertyId: { type: new GraphQLNonNull(GraphQLID) },
    ...OPTIONAL_ARGS
  },
  resolve: async (_, args, { userId }) => {
    const { propertyId, turfIds, ...newBody } = args;

    const property = await models.UserProperty.findByPk(propertyId);

    if (property) {
      newBody.userPropertyId = property.id;
    } else {
      throw new Error('Cannot find property with ID: ' + propertyId);
    }

    const createdUserLawn = await models.UserLawn.create({...newBody, userId})

    if (turfIds) {
      // do mutation for turf
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      const start = async () => {
        await asyncForEach(turfIds, async turfId => {
          await models.UserTurf.create({
            userLawnId: createdUserLawn.id,
            turfId,
          });
        });
      };

      await start();

      return createdUserLawn;
    }


  },
};

const updateUserLawn = {
  type: type,
  description: 'The mutation that allows you to update an existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ...OPTIONAL_ARGS
  },
  resolve: async (_, { id, ...newBody }, { userId }) => {
    const foundLawn = await models.UserLawn.findByPk(id);
    if (!foundLawn) {
      throw new Error(`Lawn with id: ${id} not found!`);
    }
    console.log({ id, ...foundLawn, ...newBody }, 'bang newBody');

    await models.UserLawn.update(newBody, { where: { id, userId }});

    return { id, ...foundLawn, ...newBody };
  }
};

const deleteUserLawn = {
  type: type,
  description: 'The mutation that allows you to delete a existing Property by Id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }, { userId }) => {
    const foundLawn = await models.UserLawn.findByPk(id);

    if (!foundLawn) {
      throw new Error(`UserLawn with id: ${id} not found!`);
    }

    await models.UserLawn.destroy({ where: { id, userId } });

    return foundLawn;
  },
};

module.exports = {
  createUserLawn,
  updateUserLawn,
  deleteUserLawn,
};
