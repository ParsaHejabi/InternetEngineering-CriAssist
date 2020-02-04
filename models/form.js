const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Form', formSchema);