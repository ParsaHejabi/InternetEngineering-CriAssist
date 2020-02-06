const graphql = require("graphql");
const formFieldObject = require("./formField");

const formObject = new graphql.GraphQLObjectType({
  name: "Form",
  fields: () => ({
    _id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID)
    },
    title: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    fields: {
      type: new graphql.GraphQLNonNull(
        graphql.GraphQLList(
          new graphql.GraphQLNonNull(formFieldObject.FormField)
        )
      )
    }
  })
});

const formInput = new graphql.GraphQLInputObjectType({
  name: "FormInput",
  fields: () => ({
    title: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    fields: {
      type: new graphql.GraphQLNonNull(
        graphql.GraphQLList(
          new graphql.GraphQLNonNull(formFieldObject.FormFieldInput)
        )
      )
    }
  })
});

module.exports = { formObject, formInput };
