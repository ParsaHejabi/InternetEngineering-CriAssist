const graphql = require("graphql");
const graphqlGeoJSON = require("./geoJSON");

module.exports = new graphql.GraphQLObjectType({
  name: "Area",
  fields: () => ({
    _id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID)
    },
    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: "Name of the area the GeoJSON representing."
    },
    geojson: {
      type: new graphql.GraphQLNonNull(graphqlGeoJSON.FeatureCollectionObject)
    }
  })
});
