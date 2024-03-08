const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            minLength: [4, 'Name must be more than 4 characters'],
            maxLength: [20, 'Name must be within 20 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        organisation: {
            type: String,
            required: [true, 'Please enter your organization name'],
            maxLength: [50, 'Organization name must be within 50 characters'],
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

/**
 * Middleware function to hash the admin's password before saving it to the database.
 * @param {Function} next - The next middleware function.
 */
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Generates a JSON Web Token (JWT) for the admin.
 * @returns {string} - The generated JWT.
 */
adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

/**
 * Compares the provided password with the admin's hashed password.
 * @param {string} password - The password to compare.
 * @returns {boolean} - A boolean indicating whether the passwords match.
 */
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Generates a reset password token for the admin.
 * @returns {string} - The reset password token.
 */
adminSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
