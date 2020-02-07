const graphql = require('graphql');
const formFieldOption = require('./formFieldOption');

const formField = {
  FormFieldTypeEnum: new graphql.GraphQLEnumType({
    name: 'FormFieldType',
    description: 'Enumeration of all form field types.',
    values: {
      Text: { value: 'Text' },
      Texts: { value: 'Texts' },
      Number: { value: 'Number' },
      Numbers: { value: 'Numbers' },
      Date: { value: 'Date' },
      Dates: { value: 'Dates' },
      Location: { value: 'Location' },
      Locations: { value: 'Locations' }
    }
  }),
  FormField: new graphql.GraphQLObjectType({
    name: 'FormField',
    fields: () => ({
      name: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      title: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      type: {
        type: new graphql.GraphQLNonNull(formField.FormFieldTypeEnum)
      },
      required: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
      },
      options: {
        type: new graphql.GraphQLList(
          new graphql.GraphQLNonNull(formFieldOption.formFieldOption)
        )
      }
    })
  }),
  FormFieldInput: new graphql.GraphQLInputObjectType({
    name: 'FormFieldInput',
    fields: () => ({
      name: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      title: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      type: {
        type: new graphql.GraphQLNonNull(formField.FormFieldTypeEnum)
      },
      required: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
      },
      options: {
        type: new graphql.GraphQLList(
          new graphql.GraphQLNonNull(formFieldOption.formFieldOptionInput)
        )
      }
    })
  })
};

module.exports = formField;
