const winston = require("winston");
const path = require("path");

/**
 * Winston logger configuration for logging to console and files.
 * @module logger
 */


const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logDirectory = "";

const consoleAndFileTransport = [
  new winston.transports.Console({
    level: "info",
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, "proctorPulseDebug.log"),
    level: "debug",
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, "proctorPulseError.log"),
    level: "error",
  }),
];

const errorConsoleTransport = new winston.transports.Console({
  level: "error",
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [...consoleAndFileTransport, errorConsoleTransport],
});

module.exports = logger;
