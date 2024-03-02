const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        organistaion: {
            type: String,
            required: true,
        },
        tests: {
            type: Schema.Types.ObjectId,
            ref: 'Test',
        },
    },
    { timestamps: true }
);

export const Admin = mongoose.model('Admin', adminSchema);
