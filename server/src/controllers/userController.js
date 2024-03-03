const ApiResponse = require('../utils/api/apiResponse');
const asyncErrors = require('../middleware/AsyncErrors');
const User = require('../models/user.models');
const sendToken = require('../utils/JWTtoken');
const logger = require('../utils/logger');
// const sendMail = require("../utils/sendEmail");
// const crypto = require("crypto")
// const cloudinary = require("cloudinary");

/**
 * Registers a new user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - A Promise that resolves after the user is registered.
 */
exports.registerUser = asyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    logger.info(`User: ${user}`)
    sendToken(user, 201, res);
});

/**
 * Authenticates a user and generates an authentication token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - A Promise that resolves after the user is authenticated.
 */
exports.loginUser = asyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    logger.debug('Starting login process...');

    if (!email || !password) {
        logger.error('Validation error: Please enter your email and password');
        return next(
            new ApiResponse(400, null, 'Please enter your email and password')
        );
    }

    logger.debug(`Querying database for user with email: ${email}`);
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        logger.error(`No user found with email: ${email}`);
        return next(new ApiResponse(401, null, 'Invalid email or password'));
    }

    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
        logger.error(`Authentication failed for user with email: ${email}`);
        return next(new ApiResponse(401, null, 'Invalid email or password'));
    }

    logger.info(`User with email ${email} logged in successfully`);
    sendToken(user, 200, res);
});


exports.userProfile = asyncErrors(async (req, res, next) => {
    let username = req.params.username;
  
    // Find the user by username
    const user = await User.findOne({ name: username });
  
    // If no user is found, pass an error to the error handling middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // If user is found, return user profile
    res.status(200).json({ success: true, user });
  });
  
  exports.updateProfile = asyncErrors(async (req, res, next) => {
    const { name, email } = req.body;
  
    // Check if name and email are provided
    if (!name || !email) {
      return next(new ErrorHandler("Please provide your name and email", 400));
    }
  
    // console.log({req.user._id})
    // Find the user by their email
    const user = await User.findById(req.user.id);
    // console.log(req.user.id);
  
    //If no user is found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Update user's name and email with new values
    user.name = name;
    user.email = email;
  
    // Saving the user to the database
    await user.save();
  
    // Return a success response
    res.status(200).json({ message: "Profile updated successfully", user });
  });