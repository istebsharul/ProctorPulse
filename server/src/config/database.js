const mongoose = require('mongoose');
// const DB_NAME = require("../utils/constants")
const logger = require('../utils/logger');

/**
 * Connects to the MongoDB database using Mongoose.
 * @returns {Promise<void>} - A Promise that resolves if the connection is successful.
 */
const connectDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.DB_URI}`
        );
        logger.info(
            `Successfully connected to database. Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        message = `Failed to connect to database. Reason ${error}`;
        logger.error(message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
