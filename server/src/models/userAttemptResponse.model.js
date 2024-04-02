const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAttemptSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test',
            required: true,
        },
        userResponses: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Question',
                    required: true,
                },
                answer: String, // You can adjust the type as per your needs
            },
        ],
        duration: {
            type: Number, // in seconds
            required: true,
        },
        total_score: {
            type: Number,
            default: 0, // Default score is 0
        },
    },
    { timestamps: true }
);

UserAttemptSchema.pre('save', async function (next) {
    const existingAttempt = await this.constructor
        .findOne({
            userId: this.userId,
            testId: this.testId,
        })
        .exec();

    if (existingAttempt) {
        const err = new Error('User already attempted this test.');
        return next(err);
    }

    next();
});

const UserAttempt = mongoose.model('UserAttempt', UserAttemptSchema);

module.exports = UserAttempt;
