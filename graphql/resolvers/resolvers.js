// const Form = require("../../models/form");
const {
  point,
  // multiPoint,
  lineString,
  // multiLineString,
  polygon,
  // multiPolygon,
  feature,
  featureCollection,
  // geometryCollection,
  area
} = require("../schema/helper/areaData.json");
const { form1, form2 } = require("../schema/helper/formData.json");

const GeoJSONTypes = {
  POINT: "Point",
  LINESTRING: "LineString",
  POLYGON: "Polygon",
  MULTIPOINT: "MultiPoint",
  MULTILINESTRING: "MultiLineString",
  MULTIPOLYGON: "MultiPolygon",
  FEATURE: "Feature",
  FEATURECOLLECTION: "FeatureCollection"
};

module.exports = {
  points: () => {
    return point;
  },
  lineStrings: () => {
    return lineString;
  },
  polygons: () => {
    return polygon;
  },
  features: () => {
    return feature;
  },
  featureCollections: () => {
    return featureCollection;
  },
  areas: () => {
    return area;
  },
  forms: () => {
    return [form1, form2];
  },
  // forms: () => {
  //   return Form.find()
  //     .then(forms => {
  //       return forms.map(form => {
  //         return { ...form._doc };
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       throw err;
  //     });
  // },
  createPoint: args => {
    const point = {
      type: GeoJSONTypes.POINT,
      pointCoordinates: args.pointInput.pointCoordinates
    };
    points.push(point);
    return point;
  },
  createLineStrings: args => {
    const lineString = {
      type: GeoJSONTypes.LINESTRING,
      lineStringCoordinates: args.lineStringInput.lineStringCoordinates
    };
    lineStrings.push(lineString);
    return lineString;
  },
  createPolygon: args => {
    const polygon = {
      type: GeoJSONTypes.POLYGON,
      polygonCoordinates: args.polygonInput.polygonCoordinates
    };
    polygons.push(polygon);
    return polygon;
  }
  // createForm: args => {
  //   const form = new Form({
  //     title: args.formInput.title
  //   });
  //   return form
  //     .save()
  //     .then(result => {
  //       console.log(result);
  //       return { ...result._doc };
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       throw err;
  //     });
  // }
};
