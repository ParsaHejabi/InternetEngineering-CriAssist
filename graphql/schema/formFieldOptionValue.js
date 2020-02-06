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
  FormFieldOptionValuePointInput: new graphql.GraphQLInputObjectType({
    name: "FormFieldOptionValuePointInput",
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
  FormFieldOptionValueTextInput: new graphql.GraphQLInputObjectType({
    name: "FormFieldOptionValueTextInput",
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
  FormFieldOptionValueNumberInput: new graphql.GraphQLInputObjectType({
    name: "FormFieldOptionValueNumberInput",
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
  FormFieldOptionValueDateInput: new graphql.GraphQLInputObjectType({
    name: "FormFieldOptionValueDateInput",
    fields: () => ({
      textValue: {
        type: graphql.GraphQLNonNull(graphql.GraphQLString)
      }
    })
  })
};

module.exports = formFieldOptionValue;
