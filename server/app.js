const express = require("express")
const app = express();
const cookie = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const ErrorMiddleWare = require("./middleware/error")


// It's used to parse incoming JSON data from request bodies (usually a POST or PUT request), this middleware will parse that JSON data and make it available in the req.body
app.use(express.json())
app.use(cookie())
app.use(bodyParser.urlencoded({extended : true})) //It extracts form data from the request body and makes it accessible through req.body. The extended option allows for parsing of extended URL-encoded syntax, such as arrays or nested objects within the form data.
app.use(fileUpload()) //This middleware handles file uploads in multipart/form-data format. It parses incoming requests with file uploads and makes the uploaded files accessible through req.files


//route Imports

const user = require("./routes/userRouter")



//In Express.js, the app.use() function is used to add middleware to your application's request . Middleware functions in Express are functions that have access to the request (req), response (res), and next function. They can perform various tasks such as modifying the request or response, handling errors, and more.


app.use("/api/user",user)// /api/user path is added additionaly , all the routes defined in producRoutes file can be accessed by adding this prefix to it.


//middleware for error handling
//this makes sure that our req res cycle goes through middleware/error.js
app.use(ErrorMiddleWare) //Here err  is the error object (errorHandler) that was passed to next() . It extracts the status code and message from the error object and sends an appropriate response to the client


module.exports = app