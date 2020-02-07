const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: [
      {
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
          enum: [
            'Text',
            'Texts',
            'Number',
            'Numbers',
            'Date',
            'Dates',
            'Location',
            'Locations'
          ],
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
      }
    ],
    required: true
  },
  // answers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'FormAnswer'
  //   }
  // ]
});

module.exports = mongoose.model('Form', formSchema);
