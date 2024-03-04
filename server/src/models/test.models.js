const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to calculate expiry date 30 days after creation
const calculateExpiryDate = () => {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // Adding 30 days
    return expiryDate;
};

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
        expiryDate: {
            type: Date,
            default: calculateExpiryDate, // Default value set to 30 days after creation
        },
        questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
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
