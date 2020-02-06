const graphql = require("graphql");
const graphqlGeoJSON = require("./geoJSON");

const area = new graphql.GraphQLObjectType({
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
      type: new graphql.GraphQLNonNull(
        graphqlGeoJSON.GeoJSON.FeatureCollectionObject
      )
    }
  })
});

const areaInput = new graphql.GraphQLInputObjectType({
  name: "AreaInput",
  fields: () => ({
    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: "Name of the area the GeoJSON representing."
    },
    geojson: {
      type: new graphql.GraphQLNonNull(graphqlGeoJSON.featureCollectionInput)
    }
  })
});

module.exports = { area, areaInput };
