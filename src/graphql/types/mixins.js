const { GraphQLString } = require('graphql');

const id = {
  id: {
    type: GraphQLString,
  }
};

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

module.exports = {
  systemDateTypes,
  id,
};
