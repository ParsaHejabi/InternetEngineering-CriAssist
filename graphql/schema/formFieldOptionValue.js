const graphql = require("graphql");

const formFieldOptionValue = {
  FormFieldOptionValuePoint: new graphql.GraphQLObjectType({
    name: "FormFieldOptionValuePoint",
    fields: () => ({
      lat: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
      },
      long: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
      }
    })
  }),
  FormFieldOptionValueText: new graphql.GraphQLObjectType({
    name: "FormFieldOptionValueText",
    fields: () => ({
      textValue: {
        type: graphql.GraphQLNonNull(graphql.GraphQLString)
      }
    })
  }),
  FormFieldOptionValueNumber: new graphql.GraphQLObjectType({
    name: "FormFieldOptionValueNumber",
    fields: () => ({
      numberValue: {
        type: graphql.GraphQLNonNull(graphql.GraphQLFloat)
      }
    })
  }),
  FormFieldOptionValueDate: new graphql.GraphQLObjectType({
    name: "FormFieldOptionValueDate",
    fields: () => ({
      dateValue: {
        type: graphql.GraphQLNonNull(graphql.GraphQLString)
      }
    })
  }),
};

module.exports = formFieldOptionValue;
