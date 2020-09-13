const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { ModelType } = require('../types');
const { Model } = require('../../models');

const modelQuery = {
  type: new GraphQLList(ModelType),
  args: {
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  },
  resolve: (user, args) => {
    return Model.findAll({where: args})
  },
};

module.exports = { modelQuery };
