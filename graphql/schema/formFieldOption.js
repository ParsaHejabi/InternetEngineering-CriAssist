const graphql = require("graphql");
const formFieldOptionValue = require("./formFieldOptionValue");

const formFieldOption = new graphql.GraphQLObjectType({
  name: "FormFieldOption",
  fields: () => ({
    label: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    value: {
      type: new graphql.GraphQLUnionType({
        name: "formFieldOptionValueProperties",
        types: [
          formFieldOptionValue.FormFieldOptionValueText,
          formFieldOptionValue.FormFieldOptionValueNumber,
          formFieldOptionValue.FormFieldOptionValuePoint,
          formFieldOptionValue.FormFieldOptionValueDate
        ],
        resolveType(value) {
          if (value.textValue) {
            return formFieldOptionValue.FormFieldOptionValueText;
          }
          if (value.numberValue) {
            return formFieldOptionValue.FormFieldOptionValueNumber;
          }
          if (value.dateValue) {
            return formFieldOptionValue.FormFieldOptionValueDate;
          }
          if (value.lat) {
            return formFieldOptionValue.FormFieldOptionValuePoint;
          }
        }
      })
    }
  })
});

const formFieldOptionInput = new graphql.GraphQLInputObjectType({
  name: "FormFieldOptionInput",
  fields: () => ({
    label: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    textValue: {
      type: formFieldOptionValue.FormFieldOptionValueTextInput
    },
    numberValue: {
      type: formFieldOptionValue.FormFieldOptionValueNumberInput
    },
    dateValue: {
      type: formFieldOptionValue.FormFieldOptionValueDateInput
    },
    pointValue: {
      type: formFieldOptionValue.FormFieldOptionValuePointInput
    }
  })
});

module.exports = { formFieldOption, formFieldOptionInput };
