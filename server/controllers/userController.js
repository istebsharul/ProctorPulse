const ErrorHandler = require("../utils/errorHandlers");
const asyncErrors = require("../middleware/AsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTtoken");
// const sendMail = require("../utils/sendEmail");
// const crypto = require("crypto")
// const cloudinary = require("cloudinary");


exports.registerUser = asyncErrors(async (req,res,next) =>{
    //the user is trying to upload an image through an api call. It's present in the users req.body.avatar. The below func is used to upload the image in the cloudinary. The 2nd parameter is specifying folder and other things in the cloudinary. After successful uploading its returning an object with some member variables like (public_id, secure_url)
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });
    
    const {name, email , password} = req.body;
    //console.log()
    const user = await User.create({
        name, email, password,
        avatar:{
            public_id: "myCloud.public_id",
            url: "myCloud.secure_url",
        }
    });
     
    // Generate a JWT token for the user and store it in the cookie
    sendToken(user,201,res)
});

//login user
exports.loginUser = asyncErrors(async (req,res,next) =>{

    const {email, password} = req.body
    
    //Check if email and password are provided
    if(!email || !password) return next(new ErrorHandler("Please enter your email and password",400))


    //The select("+password") part is used to include the password field (which is usually excluded by default) so that it can be used for password comparison.
    const user = await User.findOne({email}).select("+password")
    

    //If no user is found, return an error
    if(!user) return next(new ErrorHandler("Invalid email or password",401));

    const passwordMatched = await user.comparePassword(password)

    if(!passwordMatched) return next(new ErrorHandler("Invalid email or password",401));
    
    // Generate a JWT token for the user and store it in the cookie
    sendToken(user,200,res)

})