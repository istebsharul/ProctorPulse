const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./src/config/database');
const logger = require('./src/utils/logger');

dotenv.config({ path: './src/config/config.env' });

/**
 * Handles uncaught exceptions.
 * Logs the error and exits the process with status code 1.
 * @param {Error} err - The uncaught exception.
 */
process.on('uncaughtException', (err) => {
    const message = `Process failed to turn ON. Reason: ${err.message}`;
    logger.error(message);
    process.exit(1);
});

/**
 * Connects to the database, starts the server, and handles graceful server shutdown.
 */
connectDatabase()
    .then(() => {
        const message = `Database connection successful.`;
        logger.info(message);

        const server = app.listen(process.env.PORT || 8000, () => {
            const message = `Server is running on PORT:${process.env.PORT}`;
            logger.info(message);
        });

        process.on('SIGTERM', () => {
            server.close(() => {
                logger.info('Server closed gracefully');
                process.exit(0);
            });
        });
    })
    .catch((error) => {
        const message = `Database connection error. Reason: ${error}`;
        logger.error(message);
        process.exit(1);
    });
