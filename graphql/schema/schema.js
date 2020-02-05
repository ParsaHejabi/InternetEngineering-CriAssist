const graphql = require("graphql");
const { GeoJSON } = require("./geoJSON");
const area = require("./area");

const formFieldOptionObject = require("./formFieldOption");
const formFieldObject = require("./formField");
const formObject = require("./form");

const queryRootType = new graphql.GraphQLObjectType({
  name: "QueryRootType",
  fields: () => ({
    points: {
      type: GeoJSON.PointObject
    },
    lineStrings: {
      type: GeoJSON.LineStringObject
    },
    polygons: {
      type: GeoJSON.PolygonObject
    },
    features: {
      type: GeoJSON.FeatureObject
    },
    featureCollections: {
      type: GeoJSON.FeatureCollectionObject
    },
    areas: {
      type: graphql.GraphQLNonNull(
        new graphql.GraphQLList(graphql.GraphQLNonNull(area.area))
      )
    },
    formFieldOptions: {
      type: formFieldOptionObject
    },
    formFields: {
      type: formFieldObject.FormField
    },
    forms: {
      type: graphql.GraphQLNonNull(
        new graphql.GraphQLList(graphql.GraphQLNonNull(formObject))
      )
    }
  })
});

const mutationRootType = new graphql.GraphQLObjectType({
  name: "MutationRootType",
  fields: () => ({
    createArea: {
      type: area.area,
      args: {
        areaInput: {
          type: area.areaInput
        }
      }
    }
    // createForm: {
    // }
  })
});

module.exports = new graphql.GraphQLSchema({
  query: queryRootType,
  mutation: mutationRootType
});
