const winston = require('winston');
const path = require('path');
const { format } = require('logform');

/**
 * Winston logger configuration for logging to console and files.
 * @module logger
 */

const customFormat = format((info, opts) => {
    const stack = new Error().stack.split('\n');
    let callerInfo;

    for (let i = 0; i < stack.length; i++) {
        if (!stack[i].includes('node_modules') && !stack[i].includes('logger.js') && stack[i].match(/at\s+.*\((.*):(\d+):(\d+)\)/)) {
            const match = stack[i].match(/at\s+.*\((.*):(\d+):(\d+)\)/);
            callerInfo = {
                file: path.basename(match[1]),
                line: match[2]
            };
            break;
        }
    }

    if (!callerInfo) {
        for (let i = 0; i < stack.length; i++) {
            if (!stack[i].includes('node_modules') && !stack[i].includes('logger.js') && stack[i].match(/at\s+(.*):(\d+):(\d+)/)) {
                const match = stack[i].match(/at\s+(.*):(\d+):(\d+)/);
                callerInfo = {
                    file: path.basename(match[1]),
                    line: match[2]
                };
                break;
            }
        }
    }

    if (callerInfo) {
        info.file = callerInfo.file;
        info.line = callerInfo.line;
    } else {
        info.file = 'unknown';
        info.line = 'unknown';
    }

    return info;
});

const logFormat = winston.format.combine(
    customFormat(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.file}:${info.line}] ${info.level}: ${info.message}`
    )
);

const logDirectory = ''; // Set the log directory path

const consoleAndFileTransport = [
    new winston.transports.Console({
        level: 'info',
    }),
    new winston.transports.File({
        filename: path.join(logDirectory, 'proctorPulseDebug.log'),
        level: 'debug',
    }),
    new winston.transports.File({
        filename: path.join(logDirectory, 'proctorPulseError.log'),
        level: 'error',
    }),
];

const errorConsoleTransport = new winston.transports.Console({
    level: 'error',
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [...consoleAndFileTransport, errorConsoleTransport],
});

module.exports = logger;
