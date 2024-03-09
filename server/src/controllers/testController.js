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

//Delete test
exports.deleteTest = asyncErrors(async (req, res, next) => {
    const testId = req.params.id; // Assuming the test ID is passed as a route parameter
    const deletedTest = await Test.findByIdAndDelete(testId);

    if (!deletedTest) return next(new ErrorHandler('Test not found', 404));

    return res.status(200).json({ message: 'Test deleted successfully' });
});

exports.createTest = asyncErrors(async (req, res, next) => {
    const {
        name,
        subject,
        date,
        duration,
        questions,
        allowedUsers,
        createdBy,
    } = req.body;

    const questionIds = [];

    // Iterate over the questions array and create each question
    for (const questionData of questions) {
        const questionId = await createQuestion({ body: questionData }); // Create the question
        questionIds.push(questionId); // Store the ID of the created question
    }

    // Create the test with the list of question IDs and allowed user IDs
    const newTest = new Test({
        name,
        subject,
        date,
        duration,
        questions: questionIds, // Assign the list of question IDs to the test
        users: allowedUsers, // Assign the list of allowed user IDs to the test
        createdBy,
    });

    await newTest.save();

    return res
        .status(201)
        .json({ message: 'Test created successfully', test: newTest });
});
