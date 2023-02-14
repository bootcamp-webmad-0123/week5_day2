const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
    {
        title: {
            type: String,
            minlength: 2
        },
        description: String,
        author: String,
        rating: Number,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('book', bookSchema)