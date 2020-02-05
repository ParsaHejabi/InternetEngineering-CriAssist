const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formFieldSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Text', 'Texts', 'Number', 'Numbers', 'Date', 'Dates', 'Location', 'Locations'],
    required: true
  },
  required: {
    type: Boolean,
    required: true
  },
  options: [
    {
      label: {
        type: String,
        required: true
      },
      value: {
        type: Schema.Types.Mixed
      }
    }
  ]
});

module.exports = mongoose.model("FormField", formFieldSchema);
