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
};

module.exports = { systemDateTypes, id };
