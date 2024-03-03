const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Reference to Question model
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
    },
    { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
