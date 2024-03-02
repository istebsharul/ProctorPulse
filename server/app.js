const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ErrorMiddleWare = require('./middleware/error');
const DATA_LIMIT = require('./utils/constants');

/**
 * Initializes the Express application with necessary middleware and routes.
 * @module app
*/

// Enable Cross-Origin Resource Sharing (CORS) middleware
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// Parse JSON request bodies with specified data limit
app.use(express.json({
    limit: DATA_LIMIT
}));

// Parse cookies in the request headers
app.use(cookie());

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// Enable file uploads middleware
app.use(fileUpload());

// Import and mount user routes
const user = require('./routes/userRouter');
app.use('/api/user', user); 

// Mount error handling middleware
app.use(ErrorMiddleWare); 

module.exports = app;