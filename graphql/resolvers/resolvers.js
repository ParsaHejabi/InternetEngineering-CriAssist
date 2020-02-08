const Form = require('../../models/form');
const FormAnswer = require('../../models/formAnswer');
const Area = require('../../models/area');
const { point: turfPoint, polygon: turfPolygon } = require('turf');
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon');
// const {
//   point,
//   lineString,
//   polygon,
//   feature,
//   featureCollection,
//   area
// } = require('../schema/helper/areaData.json');

// const GeoJSONTypes = {
//   POINT: 'Point',
//   LINESTRING: 'LineString',
//   POLYGON: 'Polygon',
//   MULTIPOINT: 'MultiPoint',
//   MULTILINESTRING: 'MultiLineString',
//   MULTIPOLYGON: 'MultiPolygon',
//   FEATURE: 'Feature',
//   FEATURECOLLECTION: 'FeatureCollection'
// };

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
    return Area.find()
      .then(areas => {
        return areas.map(area => {
          return { ...area._doc };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createArea: args => {
    const area = new Area({
      name: args.areaInput.name,
      geojson: args.areaInput.geojson
    });
    return Area.findOne({ name: area.name })
      .then(duplicateArea => {
        if (duplicateArea) {
          throw new Error('An area with this name exists already.');
        }
        return area.save();
      })
      .then(result => {
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
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
  form: args => {
    return Form.findById(args._id)
      .then(form => {
        if (!form) {
          throw new Error('There is no form with given id.');
        }
        return { ...form._doc };
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
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  formAnswers: () => {
    return FormAnswer.find()
      .then(formAnswers => {
        return formAnswers.map(formAnswer => {
          return { ...formAnswer._doc };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  formAnswer: args => {
    return FormAnswer.findById(args._id)
      .then(formAnswer => {
        if (!formAnswer) {
          throw new Error('There is no formAnswer with given id.');
        }
        return { ...formAnswer._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  formAnswersWithGivenFormId: args => {
    return FormAnswer.find()
      .where('formId')
      .equals(args.formId)
      .then(formAnswers => {
        if (formAnswers.length === 0) {
          throw new Error('There is no form with given formId.');
        }
        return formAnswers.map(formAnswer => {
          return { ...formAnswer._doc };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createFormAnswer: args => {
    const formAnswer = new FormAnswer({
      formId: args.formAnswerInput.formId,
      value: args.formAnswerInput.value
    });
    return Form.findById(formAnswer.formId)
      .then(form => {
        if (!form) {
          throw new Error('There is no form with given id.');
        }
        return formAnswer.save();
      })
      .then(result => {
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  areaNamesOfGivenPoint: args => {
    const result = [];
    const point = turfPoint([args.lat, args.long]);
    return Area.find(
      {
        'geojson.features.geometry.type': 'Polygon'
      },
      'geojson.features.geometry.coordinates name'
    )
      .then(areas => {
        areas.map(area => {
          area.geojson.features.map(feature => {
            const polygon = turfPolygon(feature.geometry.coordinates);
            if (booleanPointInPolygon.default(point, polygon)) {
              result.push(area.name);
            }
          });
        });
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
