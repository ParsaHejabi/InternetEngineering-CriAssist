const graphql = require('graphql');

const formAnswerObject = {
  JsonScalar: new graphql.GraphQLScalarType({
    name: 'JSONObject',
    description: 'Arbitrary JSON value',
    serialize: coerceObject,
    parseValue: coerceObject,
    parseLiteral: parseObject
  }),
  formAnswerObject: new graphql.GraphQLObjectType({
    name: 'FormAnswerObject',
    fields: () => ({
      _id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
      },
      formId: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
      },
      value: {
        type: new graphql.GraphQLNonNull(formAnswerObject.JsonScalar)
      }
    })
  })
};

function coerceObject(value) {
  return JSON.parse(value);
}

function parseObject(valueAST) {
  return JSON.stringify(valueAST.values);
}

module.exports = formAnswerObject;
