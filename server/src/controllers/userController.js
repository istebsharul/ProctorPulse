const ApiResponse = require('../utils/api/apiResponse');
const ErrorHandler = require("../utils/errorHandlers");
const asyncErrors = require('../middleware/AsyncErrors');
const User = require('../models/user.models');
const sendToken = require('../utils/JWTtoken');
const logger = require('../utils/logger');
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto")
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
    logger.info(`Name: ${name}\n Email: ${email}\n Password: ${password}`)
    const user = await User.create({
        name,
        email,
        password,
    });
    logger.info("Hello")
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


//forgot password
exports.forgotPassword = asyncErrors(async (req,res,next) =>{

    const user  = await User.findOne({email : req.body.email})

    if(!user) return next(new ErrorHandler("User not found",404))


    const resetToken = user.getResetPasswordToken() //defined models/userModel

    await user.save({validateBeforeSave : false}) //in getResetPasswordtoken() we are changing some variables of user, those are needed to be updated in the database 

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;

    const message = `Follow the url to reset your password : \n\n ${resetPasswordUrl} \n\n If u haven't requested it , ignore it `

   try {
    //defined in utils/sendEmail
    await sendMail({
        email : user.email,
        subject : `Password Recovery`,
        message

    })
    res.status(201).json({
        success: true,
        message : `mail sent to ${user.email} successfully`
    })
    
   } catch (error) {
    //in getResetPasswordtoken() we were changing some variables of user, those were also  updated in the database on failure/success they need to be assigned their original value and update the database
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({validateBeforeSave : false})

    return next(new ErrorHandler(error.message,500))
    
   }
})

//reset password
exports.resetPassword = asyncErrors(async (req,res,next) =>{

    //console.log(req.params.token)
    
    resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")



    const user  = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) return next(new ErrorHandler("Reset password token is invalid or has expired", 404))
   
    if(req.body.password!=req.body.confirmPassword) return next(new ErrorHandler("Password doesn't match", 400))


    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined


    await user.save()
    sendToken(user,200,res) // store cookies
})





//update password after log in 
exports.updatePassword = asyncErrors(async(req,res,next) =>{
    
    const user = await User.findById(req.user._id).select("+password")
    
    const passwordMatched = await user.comparePassword(req.body.password)
    
    if(!passwordMatched) return next(new ErrorHandler("Wrong Password",401));
   
    if(req.body.newPassword != req.body.confirmPassword) return next(new ErrorHandler("Password doesn't match"))
    
    user.password = req.body.newPassword

    await user.save()
    sendToken(user,200,res) // store cookies
})