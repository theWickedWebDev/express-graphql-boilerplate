const {
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const mapErrorsToReturnType = (error) => {
  const { name, errors } = error;

  return {
    __typename: 'ErrorResponse',
    errors: errors.map(err => ({
      name: name,
      code: err.validatorKey,
      message: err.message,
      field: err.path,
      value: err.value,
    })),
  }
}

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  description: 'An error that occurred while processing a request',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    code: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    field: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  }),
});

const ErrorResponseType = new GraphQLObjectType({
  name: 'ErrorResponse',
  description: 'An errror that occurred while processing a request',
  fields: () => ({
    errors: {
      type: new GraphQLList(new GraphQLNonNull(ErrorType)),
      description: 'The error that occurred',
    },
  }),
});

function getErrorResponseUnion(type) {
  return new GraphQLUnionType({
    name: `${type.name}_OrError`,
    types: [type, ErrorResponseType],
    resolveType(value) {
      if (value.__typename === 'ErrorResponse') {
        return ErrorResponseType;
      } else {
        return type;
      }
    }
  });
}

module.exports = {
  getErrorResponseUnion,
  mapErrorsToReturnType,
}
