const { GraphQLString } = require('graphql');

const systemDateTypes = {
  createdAt: {
    type: GraphQLString,
    resolve: (note) => note.createdAt,
  },
  updatedAt: {
    type: GraphQLString,
    resolve: (note) => note.createdAt,
  },
};

const id = {
  type: GraphQLString,
  resolve: ({ id }) => id,
};

module.exports = { systemDateTypes, id };
