const logger = require("../utils/logger")
const ApiResponse = require('../utils/api/apiResponse');
const asyncErrors = require('../middleware/AsyncErrors');
const Test = require('../models/test.models')
const User = require('../models/user.models')
const {isValidObjectId, isIdExists} = require('../utils/api/apiValidation')


/**
 * Fetch the test history of the user with given userId.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - A Promise that resolves after the user is registered.
 */
exports.getTestHistory = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    logger.info(`RequestBody: ${userId}`)

    if (!isValidObjectId(userId)){
        message = `UserId ${userId} is not valid.`
        logger.error(message)
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesUserExists = await isIdExists(User, userId);
    
    logger.info(`doesUser: ${doesUserExists}`)
    if (!doesUserExists){
        message = `User with userId ${userId} does not exist.`
        logger.error(message)
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    try {
        const testHistory = await Test.find({ users: { $elemMatch: { $eq: userId } } });
        logger.info("Test History fetched successfully.")
        logger.info(testHistory)

        const formattedTestHistory = testHistory.map(test => ({
            testId: test._id,
            name: test.name,
            subject: test.subject,
            score: test.score,
            status: test.status
        }));

        logger.info(formattedTestHistory)
        
        const totalTests = formattedTestHistory.length;
        data = {
            testHistory: formattedTestHistory,
            totalTests: totalTests
        }
        response = new ApiResponse(200, data)
        return res.status(400).json(response)
    }
    catch(err) {
        message = `Failed to fetch the test history with userId ${userId}. Reason: ${err}`
        logger.error(message)
        return next(err)
        
    }
});