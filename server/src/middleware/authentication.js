const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandlers');
const AsyncErrors = require('./AsyncErrors');
const User = require('../models/user.models');
const Admin = require('../models/admin.models');

/**
 * Middleware to check if the user is authenticated.
 * Verifies the JWT token in the request cookies and sets the authenticated user in the request object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {Promise<void>} - A promise that resolves if the user is authenticated.
 */
exports.isAuthenticatedUser = AsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return next(new ErrorHandler('Please login to access this', 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id); //req.user is any js object consisting of all details of an user

    console.log(req.user);

    next();
});

exports.isAuthenticatedAdmin = AsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this', 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decodeData.id);

    // console.log('req.admin', req.admin);

    next();
});
