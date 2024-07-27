const asyncErrors = require('../middleware/AsyncErrors');
const Admin = require('../models/admin.models');
const sendToken = require('../utils/JWTtoken');
const ApiResponse = require('../utils/api/apiResponse');
const ErrorHandler = require('../utils/errorHandlers');
const logger = require('../utils/logger');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinary.js')

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
        return next(new ApiResponse(401, null, 'Admin not found!'));
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

// Logout admin
exports.logoutAdmin = asyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Admin logout successfully',
    })
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
    const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

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
        logger.info(`Admin Email sent Successfully to: ${admin.email}`);

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
    logger.info(`Reset password token received for Admin: ${req.params.token}`);

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
        logger.error('Admin Reset password token is invalid or has expired logger');
        return next(
            new ErrorHandler('Admin Reset password is invalid or has expired neh', 404)
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

    // res.status(200).json({message:"Password Reset Successful!"});
});

// Get admin public profile
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

// LoggedIn Profile
exports.adminProfile = asyncErrors(async (req, res, next) => {
    // Find the user by username
    console.log(req.admin._id)

    const admin = await Admin.findById(req.admin._id)

    // If no user is found, pass an error to the error handling middleware
    if (!admin) {
        logger.error('Admin not found');
        return res.status(404).json({ message: 'Admin not found' });
    }

    // If user is found, log an info message
    logger.info(`Admin profile retrieved for username ${admin.imageUrl}`);

    // If user is found, return user profile
    res.status(200).json({ success: true, admin });
})

// Update admin profile
exports.updateProfileAdmin = asyncErrors(async (req, res, next) => {

    const admin = await Admin.findById(req.admin.id);
    logger.info(admin);

    if (admin) {
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;
        admin.organisation = req.body.organisation || admin.organisation;

        if (req.body.imageUrl) {
            const uploadedResponse = await cloudinary.uploader.upload(req.body.imageUrl, {
                upload_preset: 'ml_default',
            });

            admin.imageUrl = uploadedResponse.secure_url;
        }

        if (req.body.password) {
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.status(200).json({
            id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            organisation: updatedAdmin.organisation,
            imageUrl: updatedAdmin.imageUrl,
            token: updatedAdmin.getJWTToken(),
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
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
