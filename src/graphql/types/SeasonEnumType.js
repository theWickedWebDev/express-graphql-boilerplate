const {
  GraphQLEnumType,
} = require('graphql');

const SeasonEnumType = new GraphQLEnumType({
  name: 'SeasonEnum',
  values: {
    COOL: {
      value: 'COOL',
    },
    WARM: {
      value: 'WARM',
    },
  },
});

module.exports = { SeasonEnumType };
