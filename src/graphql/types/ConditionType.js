const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { systemDateTypes, id } = require('./mixins');

const ConditionType = new GraphQLObjectType({
  name: 'Condition',
  description: 'This represents a Condition',
  fields: () => ({
    ...id,
    value: { type: GraphQLString },
    ...systemDateTypes,
  }),
});

module.exports = { ConditionType };
