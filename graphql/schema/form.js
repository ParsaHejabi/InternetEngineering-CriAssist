const graphql = require("graphql");
const formFieldObject = require("./formField");

module.exports = new graphql.GraphQLObjectType({
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
        graphql.GraphQLList(new graphql.GraphQLNonNull(formFieldObject.FormField))
      )
    }
  })
});
