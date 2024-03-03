const logger = require("../utils/logger");

/**
 * Creates an instance of ErrorHandler.
 * @param {string} message - The error message.
 * @param {number} statusCode - The status code associated with the error.
 */

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
