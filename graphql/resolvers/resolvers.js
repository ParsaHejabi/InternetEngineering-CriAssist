const Form = require("../../models/form");
const {
  point,
  lineString,
  polygon,
  feature,
  featureCollection,
  area
} = require("../schema/helper/areaData.json");

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
    return [area];
  },
  createArea: args => {
    console.log(args.areaInput);
    console.log(args.areaInput.geojson);
    console.log(args.areaInput.geojson.features[0].geometry);
    return args;
  },
  forms: () => {
    return Form.find()
      .then(forms => {
        return forms.map(form => {
          return { ...form._doc };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createForm: args => {
    const form = new Form({
      title: args.formInput.title,
      fields: args.formInput.fields
    });
    return form
      .save()
      .then(result => {
        console.log(result);
        return { ...form._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
