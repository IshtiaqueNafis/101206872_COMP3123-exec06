const mongoose = require('mongoose');

const NoteTakingSchema = new mongoose.Schema(
    {
        noteTitle: {
            type: String,
            required: [true, 'Please add a note title'],
            trim: true
        },
        noteDescription: {
            type: String,
            required: [true, 'Please add a note description'],
            maxlength: [500, 'Description can not be more than 500 characters']

        },
        priority: {
            type: String,
            required: [true, 'Please add a priority'],
            enum: [`HIGH`, `LOW`, `MEDUIM`]
        },
        dateAdded: {
            type: Date,
            default: Date.now
        },
        dateUpdated: {
            type: Date
        }


    }
);
module.exports = mongoose.model('NoteTaking', NoteTakingSchema);