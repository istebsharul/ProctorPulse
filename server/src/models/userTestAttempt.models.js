const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTestAttemptSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        test_id: {
            type: Schema.Types.ObjectId,
            ref: 'Test',
            required: true,
        },
        attempt_date: {
            type: Date,
            default: Date.now,
        },
        total_score: {
            type: Number,
            required: true,
        },
        attempted_questions: {
            type: Number,
            required: true,
        },
        skipped_questions: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const UserTestAttempt = mongoose.model(
    'UserTestAttempt',
    userTestAttemptSchema
);

module.exports = UserTestAttempt;
