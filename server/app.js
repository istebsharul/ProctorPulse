require('dotenv').config();
const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ErrorMiddleWare = require('./src/middleware/error');
const DATA_LIMIT = require('./src/utils/constants');
const cors = require('cors');
const cloudinary = require('./src/config/cloudinary');
const upload = require('./src/middleware/multer');

/**
 * Initializes the Express application with necessary middleware and routes.
 * @module app
 */

// Enable Cross-Origin Resource Sharing (CORS) middleware
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(cors());

// Parse JSON request bodies with specified data limit
app.use(
    express.json({
        limit: DATA_LIMIT,
    })
);

app.get('/test-cloudinary', async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload('https://example.com/test-image.jpg', {
            upload_preset: 'ml_default', // Adjust according to your setup
        });
        res.status(200).json({
            message: 'Cloudinary is configured correctly!',
            result,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to upload image to Cloudinary',
            error: error.message,
        });
    }
});
// Parse cookies in the request headers
app.use(cookie());

// Parse URL-encoded request bodies
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Enable file uploads middleware
app.use(fileUpload());

// Import and mount user routes
const userRoutes = require('./src/routes/userRouter');
app.use('/api/user', userRoutes);

const testRoutes = require('./src/routes/testRouter');
app.use('/api', testRoutes);

const adminRoutes = require('./src/routes/adminRouter');
app.use('/api/admin', adminRoutes);

// Mount error handling middleware
app.use(ErrorMiddleWare);

module.exports = app;
