const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const geometrySchema = new Schema({
  type: {
    type: String,
    enum: ['Point', 'LineString', 'Polygon'],
    required: true
  },
  coordinates: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const geojsonSchema = new Schema({
  type: {
    type: String,
    enum: ['FeatureCollection'],
    required: true
  },
  features: {
    type: [
      {
        type: {
          type: String,
          enum: ['Feature'],
          required: true
        },
        name: {
          type: String
        },
        geometry: {
          type: geometrySchema,
          required: true
        }
      }
    ],
    required: true
  }
});

const areaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  geojson: {
    type: geojsonSchema,
    required: true
  }
});

module.exports = mongoose.model('Area', areaSchema);
