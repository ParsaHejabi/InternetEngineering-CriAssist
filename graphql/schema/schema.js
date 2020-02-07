const graphql = require('graphql');
const { GeoJSON } = require('./geoJSON');
const area = require('./area');

const formFieldOptionObject = require('./formFieldOption');
const formFieldObject = require('./formField');
const form = require('./form');

const formAnswer = require('./formAnswer');

const queryRootType = new graphql.GraphQLObjectType({
  name: 'QueryRootType',
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
      type: formFieldOptionObject.formFieldOption
    },
    formFields: {
      type: formFieldObject.FormField
    },
    forms: {
      type: graphql.GraphQLNonNull(
        new graphql.GraphQLList(graphql.GraphQLNonNull(form.formObject))
      )
    },
    form: {
      type: graphql.GraphQLNonNull(form.formObject),
      args: {
        _id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
      }
    },
    formAnswers: {
      type: graphql.GraphQLNonNull(
        new graphql.GraphQLList(
          graphql.GraphQLNonNull(formAnswer.formAnswerObject)
        )
      )
    }
  })
});

const mutationRootType = new graphql.GraphQLObjectType({
  name: 'MutationRootType',
  fields: () => ({
    createArea: {
      type: area.area,
      args: {
        areaInput: {
          type: new graphql.GraphQLNonNull(area.areaInput)
        }
      }
    },
    createForm: {
      type: form.formObject,
      args: {
        formInput: {
          type: new graphql.GraphQLNonNull(form.formInput)
        }
      }
    }
  })
});

module.exports = new graphql.GraphQLSchema({
  query: queryRootType,
  mutation: mutationRootType
});
