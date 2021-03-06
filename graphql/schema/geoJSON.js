const {
  GraphQLString: Str,
  GraphQLFloat: Float,
  GraphQLList: List,
  GraphQLEnumType: EnumType,
  GraphQLObjectType: ObjectType,
  GraphQLScalarType: ScalarType,
  GraphQLInterfaceType: InterfaceType,
  GraphQLUnionType: UnionType,
  GraphQLNonNull: NonNull,
  GraphQLInputObjectType: InputType
} = require('graphql');

const GeoJSON = {
  TypeEnum: new EnumType({
    name: 'GeoJSONType',
    description: 'Enumeration of all GeoJSON object types.',
    values: {
      Point: { value: 'Point' },
      MultiPoint: { value: 'MultiPoint' },
      LineString: { value: 'LineString' },
      MultiLineString: { value: 'MultiLineString' },
      Polygon: { value: 'Polygon' },
      MultiPolygon: { value: 'MultiPolygon' },
      GeometryCollection: { value: 'GeometryCollection' },
      Feature: { value: 'Feature' },
      FeatureCollection: { value: 'FeatureCollection' }
    }
  }),

  CoordinatesScalar: new ScalarType({
    name: 'GeoJSONCoordinates',
    description:
      'A (multidimensional) set of coordinates following x, y, z order.',
    serialize: coerceCoordinates,
    parseValue: coerceCoordinates,
    parseLiteral: parseCoordinates
  }),

  PointObject: new ObjectType({
    name: 'GeoJSONPoint',
    description: 'Object describing a single geographical point.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  MultiPointObject: new ObjectType({
    name: 'GeoJSONMultiPoint',
    description: 'Object describing multiple geographical points.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  LineStringObject: new ObjectType({
    name: 'GeoJSONLineString',
    description:
      'Object describing a single connected sequence of geographical points.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  MultiLineStringObject: new ObjectType({
    name: 'GeoJSONMultiLineString',
    description:
      'Object describing multiple connected sequences of geographical points.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  PolygonObject: new ObjectType({
    name: 'GeoJSONPolygon',
    description:
      'Object describing a single shape formed by a set of geographical points.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  MultiPolygonObject: new ObjectType({
    name: 'GeoJSONMultiPolygon',
    description:
      'Object describing multiple shapes formed by sets of geographical points.',
    interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    })
  }),

  GeometryCollectionObject: new ObjectType({
    name: 'GeoJSONGeometryCollection',
    description: 'A set of multiple geometries, possibly of various types.',
    interfaces: () => [GeoJSON.GeoJSONInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      geometries: {
        type: new NonNull(new List(new NonNull(GeoJSON.GeometryInterface)))
      }
    })
  }),

  FeatureObject: new ObjectType({
    name: 'GeoJSONFeature',
    description:
      'An object that links a geometry to properties in order to provide context.',
    interfaces: () => [GeoJSON.GeoJSONInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      name: { type: Str },
      geometry: { type: NonNull(GeoJSON.GeometryInterface) }
      // properties: { type: GeoJSON.JsonScalar },
      // id: { type: Str }
    })
  }),

  FeatureCollectionObject: new ObjectType({
    name: 'GeoJSONFeatureCollection',
    description: 'A set of multiple features.',
    interfaces: () => [GeoJSON.GeoJSONInterface],
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      features: {
        type: new NonNull(new List(new NonNull(GeoJSON.FeatureObject)))
      }
    })
  }),

  CRSTypeEnum: new EnumType({
    name: 'GeoJSONCRSType',
    description: 'Enumeration of all GeoJSON CRS object types.',
    values: {
      name: { value: 'name' },
      link: { value: 'link' }
    }
  }),

  NamedCRSPropertiesObject: new ObjectType({
    name: 'GeoJSONNamedCRSProperties',
    description: 'Properties for name based CRS object.',
    fields: () => ({
      name: { type: new NonNull(Str) }
    })
  }),

  LinkedCRSPropertiesObject: new ObjectType({
    name: 'GeoJSONLinkedCRSProperties',
    description: 'Properties for link based CRS object.',
    fields: () => ({
      href: { type: new NonNull(Str) },
      type: { type: Str }
    })
  }),

  CRSPropertiesUnion: new UnionType({
    name: 'GeoJSONCRSProperties',
    description: 'CRS object properties.',
    types: () => [
      GeoJSON.NamedCRSPropertiesObject,
      GeoJSON.LinkedCRSPropertiesObject
    ],
    resolveType: value => {
      if (value.name) return GeoJSON.NamedCRSPropertiesObject;
      if (value.href) return GeoJSON.LinkedCRSPropertiesObject;
    }
  }),

  CoordinateReferenceSystemObject: new ObjectType({
    name: 'GeoJSONCoordinateReferenceSystem',
    description: 'Coordinate Reference System (CRS) object.',
    fields: () => ({
      type: { type: new NonNull(GeoJSON.CRSTypeEnum) },
      properties: { type: new NonNull(GeoJSON.CRSPropertiesUnion) }
    })
  }),

  GeoJSONInterface: new InterfaceType({
    name: 'GeoJSONInterface',
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) }
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) }
    }),
    resolveType: value => GeoJSON[`${value.type}Object`]
  }),

  GeometryInterface: new InterfaceType({
    name: 'GeoJSONGeometryInterface',
    fields: () => ({
      type: { type: new NonNull(GeoJSON.TypeEnum) },
      // crs: { type: new NonNull(GeoJSON.CoordinateReferenceSystemObject) },
      // bbox: { type: new List(Float) },
      coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
    }),
    resolveType: value => GeoJSON[`${value.type}Object`]
  })
};

function coerceCoordinates(value) {
  return value;
}

function parseCoordinates(valueAST) {
  const newValues = valueAST.values.map(value => {
    if (value.kind === 'FloatValue') {
      return parseFloat(value.value);
    } else if (value.kind === 'ListValue') {
      return value.values.map(oneLevelValue => {
        if (oneLevelValue.kind === 'FloatValue') {
          return parseFloat(oneLevelValue.value);
        } else if (oneLevelValue.kind === 'ListValue') {
          return oneLevelValue.values.map(twoLevelValue => {
            if (twoLevelValue.kind === 'FloatValue') {
              return parseFloat(twoLevelValue.value);
            }
          });
        }
      });
    }
  });
  // console.log(newValues);
  return newValues;
}

const featureCollectionInput = new InputType({
  name: 'FeatureCollectionInput',
  fields: () => ({
    type: { type: new NonNull(GeoJSON.TypeEnum) },
    features: {
      type: new NonNull(new List(new NonNull(featureInput)))
    }
  })
});

const featureInput = new InputType({
  name: 'FeatureInput',
  fields: () => ({
    type: { type: new NonNull(GeoJSON.TypeEnum) },
    name: { type: Str },
    geometry: { type: NonNull(geometryInterfaceInput) }
  })
});

const geometryInterfaceInput = new InputType({
  name: 'GeometryInterfaceInput',
  fields: () => ({
    type: { type: new NonNull(GeoJSON.TypeEnum) },
    coordinates: { type: NonNull(GeoJSON.CoordinatesScalar) }
  })
});

module.exports = { GeoJSON, featureCollectionInput };
