const {
  GraphQLEnumType,
} = require('graphql');

const RatingEnumType = new GraphQLEnumType({
  name: 'RatingEnum',
  values: {
    POOR: {
      value: 'POOR',
    },
    GOOD: {
      value: 'GOOD',
    },
    EXCELLENT: {
      value: 'EXCELLENT',
    },
    SUPERIOR: {
      value: 'SUPERIOR',
    },
  },
});

module.exports = { RatingEnumType };
