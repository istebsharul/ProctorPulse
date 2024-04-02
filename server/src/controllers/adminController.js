const asyncErrors = require('../middleware/AsyncErrors');
const Admin = require('../models/admin.models');
const sendToken = require('../utils/JWTtoken');
const ApiResponse = require('../utils/api/apiResponse');
const ErrorHandler = require('../utils/errorHandlers');
const logger = require('../utils/logger');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register a new admin
exports.registerAdmin = asyncErrors(async (req, res, next) => {
    const { name, email, password, organisation } = req.body;

    logger.info(`Name: ${name}\n Email: ${email}\n Password: ${password}`);
    // Create a new admin
    const admin = await Admin.create({
        name,
        email,
        password,
        organisation,
    });

    // Log admin registration
    logger.info(`Admin: ${admin}`);
    logger.info('Admin registered Successfully');

    // Send token upon successful registration
    sendToken(admin, 201, res);
});

// Login admin
exports.loginAdmin = asyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    logger.debug('Starting login process...');
    logger.debug(`Received email: ${email}`);

    logger.debug(`Querying database for user with email: ${email}`);
    // Find admin by email
    const admin = await Admin.findOne({ email }).select('+password');

    // If admin not found, return error
    if (!admin) {
        logger.error('Admin not found');
        return next(new ApiResponse(401, null, 'Invalid email and password'));
    }
    // console.log(admin);

    logger.debug('Admin found:', admin.name);

    logger.debug('Received password:', password);

    // Compare passwords
    const passwordMatched = await admin.comparePassword(password);

    // If passwords don't match, return error
    if (!passwordMatched) {
        logger.error('Invalid password');
        return next(new ApiResponse(401, null, 'Invalid email or password'));
    }

    logger.debug('Password matched');

    logger.info(`Admin with email ${email} logged in successfully`);
    // Send token upon successful login
    sendToken(admin, 200, res);
});

// Get admin profile
exports.profileAdmin = asyncErrors(async (req, res, next) => {
    let adminUsername = req.params.username;

    // Find admin by username
    const admin = await Admin.findOne({ name: adminUsername });

    // If admin not found, return error
    if (!admin) {
        logger.error('Admin Not Found');
        return res.status(404).json({ message: 'Admin Not Found!' });
    }

    // Log admin profile retrieval
    logger.info(`Admin profile retrieved for admin: ${admin}`);

    // Return admin profile
    res.status(200).json({ success: true, admin });
});

// Update admin profile
exports.updateProfileAdmin = asyncErrors(async (req, res, next) => {
    const { name, email } = req.body;

    logger.debug('updating started');

    // Check if name and email are provided
    if (!name || !email) {
        return next(
            new ErrorHandler('Please provide your name and email', 400)
        );
    }

    // Check if req.admin exists and has the id property
    if (!req.admin || !req.admin.id) {
        logger.error('Admin ID not found in request');
        return res
            .status(404)
            .json({ message: 'Admin ID not found in request' });
    }

    // Find admin by ID
    const admin = await Admin.findById(req.admin.id);
    // console.log('admin: ', admin);

    // If admin not found, return error
    if (!admin) {
        logger.error('Admin not Found');
        return res.status(404).json({ message: 'Admin not found' });
    }

    // Update admin's name and email
    admin.name = name;
    admin.email = email;

    // Save updated profile
    await admin.save();

    // Log profile update
    logger.info('Profile updated Successfully');

    // Return success response
    res.status(200).json({ message: 'Profile Updated Successfully', admin });
});

// Controller for handling admin forgot password request
exports.forgotPasswordAdmin = asyncErrors(async (req, res, next) => {
    // Find admin by email
    const admin = await Admin.findOne({ email: req.body.email });

    // If admin not found, return error
    if (!admin) {
        logger.error('Admin Not Found');
        return next(new ErrorHandler('Admin not found', 404));
    }

    // Generate reset password token
    const resetToken = admin.getResetPasswordToken();

    // Save admin with token (validateBeforeSave is set to false to bypass schema validation)
    await admin.save({ validateBeforeSave: false });

    // Construct reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/password/reset/${resetToken}`;

    // Compose email message
    const message = `Follow the url to reset your password : \n\n ${resetPasswordUrl} \n\n If u haven't requested it , ignore it `;

    try {
        // Send password reset email
        await sendMail({
            email: admin.email,
            subject: 'Password Recovery',
            message,
        });

        // Log successful email sending
        logger.info(`Email sent Successfully to: ${admin.email}`);

        // Respond with success message
        res.status(201).json({
            success: true,
            message: `Mail sent to ${admin.email} successfully`,
        });
    } catch (error) {
        // Log error sending email
        logger.error(`Error sending email: ${error.message}`);

        // Clear reset token and expiration
        admin.resetPasswordToken = undefined;
        admin.resetPasswordToken = undefined;

        // Save admin changes
        await admin.save({ validateBeforeSave: false });

        // Pass error to error handling middleware
        return next(new ErrorHandler(error.message, 500));
    }
});

// Controller for handling admin reset password request
exports.resetPasswordAdmin = asyncErrors(async (req, res, next) => {
    // Log reset password token received
    logger.info(`Reset password token received: ${req.params.token}`);

    // Hash reset token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    // Find admin by reset token and check expiration
    const admin = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // If admin not found or token expired, return error
    if (!admin) {
        logger.error('Reset password token is invalid or has expired');
        return next(
            new ErrorHandler('Reset password is invalid or has expired', 404)
        );
    }

    // Check if passwords match
    if (req.body.password != req.body.confirmPassword) {
        logger.error("Password Doesn't match");
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    // Update admin password and clear reset token fields
    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    // Save admin changes
    await admin.save();

    // Log password reset success
    logger.info('Password reset successfully');

    // Send token and respond with success
    sendToken(admin, 200, res);
});

// Controller for handling admin update password request
exports.updatePasswordAdmin = asyncErrors(async (req, res, next) => {
    // Find admin by ID and select password field
    const admin = await Admin.findById(req.admin._id).select('+password');

    // Check if provided password matches the stored one
    const passwordMatched = await admin.comparePassword(req.body.password);

    // If password doesn't match, return error
    if (!passwordMatched) {
        logger.error('Wrong password Provided');
        return next(new ErrorHandler('Wrong Password', 401));
    }

    // Check if new password and confirm password match
    if (req.body.newPassword != req.body.confirmPassword) {
        logger.error("New password and confirm password don't match");
        return next(new ErrorHandler("Password doesn't match"));
    }

    // Update admin password
    admin.password = req.body.password;

    // Save admin changes
    await admin.save();

    // Log password update success
    logger.info('Password updated Successfully');

    // Send token and respond with success
    sendToken(admin, 200, res);
});
