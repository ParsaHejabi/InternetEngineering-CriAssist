const graphql = require('graphql');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const formAnswerObject = {
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
        type: new graphql.GraphQLNonNull(GraphQLJSONObject)
      }
    })
  }),
  formAnswerInput: new graphql.GraphQLInputObjectType({
    name: 'FormAnswerInputObject',
    fields: () => ({
      formId: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
      },
      value: {
        type: new graphql.GraphQLNonNull(GraphQLJSONObject)
      }
    })
  })
};

module.exports = formAnswerObject;
