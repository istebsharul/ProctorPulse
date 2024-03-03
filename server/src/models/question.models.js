const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        options: [
            {
                type: String,
                required: true,
            },
        ],
        correct_answer: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Question = mongoose.model('Question', questionSchema);
