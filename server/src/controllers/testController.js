const logger = require('../utils/logger');
const ApiResponse = require('../utils/api/apiResponse');
const asyncErrors = require('../middleware/AsyncErrors');
const Test = require('../models/test.models');
const User = require('../models/user.models');
const { isValidObjectId, isIdExists } = require('../utils/api/apiValidation');
const UserTestAttempt = require('../models/userTestAttempt.models');
const { formattedTestDetails } = require('../services/questionService');
/**
 * Fetch the test history of the user with given userId.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - A Promise that resolves after the user is registered.
 */
exports.getTestHistory = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    logger.info(`RequestBody: ${userId}`);

    if (!isValidObjectId(userId)) {
        message = `UserId ${userId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesUserExists = await isIdExists(User, userId);

    logger.info(`doesUser: ${doesUserExists}`);
    if (!doesUserExists) {
        message = `User with userId ${userId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    try {
        const testHistory = await Test.find({
            users: { $elemMatch: { $eq: userId } },
        });
        logger.info('Test History fetched successfully.');
        logger.info(testHistory);

        const formattedTestHistory = testHistory.map((test) => ({
            testId: test._id,
            name: test.name,
            subject: test.subject,
            score: test.score,
            status: test.status,
        }));

        logger.info(formattedTestHistory);

        const totalTests = formattedTestHistory.length;
        data = {
            testHistory: formattedTestHistory,
            totalTests: totalTests,
        };
        response = new ApiResponse(200, data);
        return res.status(200).json(response);
    } catch (err) {
        message = `Failed to fetch the test history with userId ${userId}. Reason: ${err}`;
        logger.error(message);
        return next(err);
    }
});

/**
 * Fetch the test available tests of a user with given userId.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - A Promise that resolves after the user is registered.
 */
exports.getAvailableTests = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    logger.info(`RequestBody: ${userId}`);

    if (!isValidObjectId(userId)) {
        message = `UserId ${userId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesUserExists = await isIdExists(User, userId);

    logger.info(`doesUser: ${doesUserExists}`);
    if (!doesUserExists) {
        message = `User with userId ${userId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        const availableTests = await Test.find({
            users: { $elemMatch: { $eq: userId } },
        });
        logger.info('Available tests fetched successfully.');
        logger.info(availableTests);

        const formattedTests = [];

        for (const test of availableTests) {
            let userTestAttempt;
            try {
                userTestAttempt = await UserTestAttempt.findOne({
                    user_id: userId,
                    test_id: test._id,
                });
            } catch (err) {
                const message = `Failed to fetch the user test attempted with test_id ${test._id}. Reason: ${err}`;
                logger.error(message);
                return next(err);
            }

            const status = userTestAttempt ? 'Completed' : 'Available';

            formattedTests.push({
                testId: test._id,
                name: test.name,
                subject: test.subject,
                duration: test.duration.toString(), // Convert duration to string if needed
                status: status,
            });
        }

        const response = new ApiResponse(200, formattedTests);
        return res.status(200).json(response);
    } catch (err) {
        const message = `Failed to fetch available tests for user with userId ${userId}. Reason: ${err}`;
        logger.error(message);
        return next(err);
    }
});

exports.getTestDetails = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    const testId = req.params.testId;
    logger.info(req);

    if (!isValidObjectId(userId)) {
        message = `UserId ${userId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesUserExists = await isIdExists(User, userId);

    logger.info(`doesUser: ${doesUserExists}`);
    if (!doesUserExists) {
        message = `User with userId ${userId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    if (!isValidObjectId(userId)) {
        message = `testId ${testId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesTestExists = await isIdExists(Test, testId);

    logger.info(`doesUser: ${doesTestExists}`);
    if (!doesTestExists) {
        message = `Test with testId ${testId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        const testDetails = await Test.findOne({
            _id: testId,
            users: { $in: [userId] },
        });
        logger.info(testDetails);
        const data = await formattedTestDetails(testDetails);
        response = new ApiResponse(200, data);
        return res.status(200).json(response);
    } catch (err) {
        message = `Failed to get the details of the test ${testId} of the user ${userId}`;
        logger.error(message);
        return next(err);
    }
});


exports.submitTest = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    const testId = req.params.testId;
    const { answers } = req.body;
    console.log(answers);

    // Validate request body schema
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
        const message = 'Invalid request body. Missing or empty answers array.';
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    // Validate userId and testId
    if (!isValidObjectId(userId)) {
        const message = `UserId ${userId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    if (!isValidObjectId(testId)) {
        const message = `TestId ${testId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    // Check if user and test exist
    const userExists = await isIdExists(User, userId);
    const testExists = await isIdExists(Test, testId);

    if (!userExists) {
        const message = `User with userId ${userId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    if (!testExists) {
        const message = `Test with testId ${testId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        // Check if timer is zero
        const testDetails = await Test.findById(testId);
        if (testDetails && testDetails.timer === 0) {
            // Auto-submit if timer is zero
            const submission = new TestSubmission({
                userId,
                testId,
                answers,
                submittedAt: new Date(),
            });
            await submission.save();

            // Return success response
            const response = new ApiResponse(200, { message: 'Test submitted successfully.' });
            return res.status(200).json(response);
        } else {
            // Process submitted answers and save to the database
            // Implementation depends on your data model and business logic

            // Example: Saving answers to a database
            const submission = new TestSubmission({
                userId,
                testId,
                answers,
                submittedAt: new Date(),
            });
            await submission.save();

            // Return success response
            const response = new ApiResponse(200, { message: 'Test submitted successfully.' });
            return res.status(200).json(response);
        }
    } catch (err) {
        // Handle errors
        logger.error(`Failed to submit test: ${err.message}`);
        return next(err);
    }
});
