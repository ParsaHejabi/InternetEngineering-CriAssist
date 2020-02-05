const graphql = require("graphql");
const {
  PointObject,
  MultiPointObject,
  LineStringObject,
  MultiLineStringObject,
  PolygonObject,
  MultiPolygonObject,
  GeometryCollectionObject,
  FeatureObject,
  FeatureCollectionObject
} = require("./geoJSON");
const areaObject = require("./area");

const formFieldOptionObject = require("./formFieldOption");
const formFieldObject = require("./formField");
const formObject = require("./form");

module.exports = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: "QueryRootType",
    fields: () => ({
      points: {
        type: PointObject
      },
      // multiPoint: {
      //   type: MultiPointObject,
      //   resolve: () => multiPoint
      // },
      lineStrings: {
        type: LineStringObject
      },
      // multiLineString: {
      //   type: MultiLineStringObject,
      //   resolve: () => multiLineString
      // },
      polygons: {
        type: PolygonObject
      },
      // multiPolygon: {
      //   type: MultiPolygonObject,
      //   resolve: () => multiPolygon
      // },
      features: {
        type: FeatureObject
      },
      featureCollections: {
        type: FeatureCollectionObject
      },
      // geometryCollection: {
      //   type: GeometryCollectionObject,
      //   resolve: () => geometryCollection
      // },
      areas: {
        type: graphql.GraphQLNonNull(areaObject)
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
  })
});
