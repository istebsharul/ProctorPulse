const logger = require('../utils/logger');
const ApiResponse = require('../utils/api/apiResponse');
const asyncErrors = require('../middleware/AsyncErrors');
const Test = require('../models/test.models');
const User = require('../models/user.models');
const Question = require('../models/question.models');
const { isValidObjectId, isIdExists } = require('../utils/api/apiValidation');
const UserTestAttempt = require('../models/userTestAttempt.models');
const { formattedTestDetails } = require('../services/questionService');
const { createQuestion } = require('./questionController');
const ErrorHandler = require('../utils/errorHandlers');
const calculateScore = require('../services/evaluation');
const UserAttempt = require('../models/userAttemptResponse.model');

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

// Get Available Test -> Fetching all the Test assigned to a particular User
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

// Get Test Details -> Fetching all the question of the Test
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

exports.deleteTest = asyncErrors(async (req, res, next) => {
    const testId = req.params.testId;

    const test = await Test.findById(testId);

    if (!test) {
        const errorMessage = 'Test not found';
        logger.error(errorMessage);
        return next(new ErrorHandler(errorMessage, 404));
    }

    const questionIds = test.questions;

    await Promise.all(
        questionIds.map(async (questionId) => {
            await Question.findByIdAndDelete(questionId);
        })
    );

    await Test.findByIdAndDelete(testId);

    const successMessage = 'Test and associated questions deleted successfully';
    logger.info(successMessage);
    return res.status(200).json({ message: successMessage });
});

exports.createTest = asyncErrors(async (req, res, next) => {
    const { name, subject, date, duration, questions, allowedUsers } = req.body;

    const questionIds = [];

    for (const questionData of questions) {
        const response = await createQuestion({ body: questionData });

        if (response && response._id) {
            questionIds.push(response._id);
        } else {
            const errorMessage = 'Failed to create question';
            logger.error(errorMessage);
            return next(new Error(errorMessage));
        }
    }

    const newTest = new Test({
        name,
        subject,
        date,
        duration,
        questions: questionIds,
        users: allowedUsers,
        createdBy: req.admin._id,
    });

    await newTest.save();

    const successMessage = 'Test created successfully';
    logger.info(successMessage);
    return res.status(201).json({ message: successMessage, test: newTest });
});

exports.submitTest = asyncErrors(async (req, res, next) => {
    const { userId, testId, userResponses, duration } = req.body;

    const total_score = await calculateScore(userResponses, testId);

    logger.info(
        `Total score for user ${userId} in test ${testId}: ${total_score}`
    );

    const newUserAttempt = new UserAttempt({
        userId,
        testId,
        userResponses,
        total_score,
        duration,
    });

    const savedUserAttempt = await newUserAttempt.save();

    const successMessage = 'User response saved successfully';
    const response = new ApiResponse(200, savedUserAttempt, successMessage);
    logger.info(successMessage);
    res.status(201).json({
        response,
    });
});

exports.getTestResponses = asyncErrors(async (req, res, next) => {
    const { testId } = req.params;

    // Find all user attempts for the given testId
    const userAttempts = await UserAttempt.find({ testId }).exec();

    // Extract user IDs from userAttempts
    const userIds = userAttempts.map((attempt) => attempt.userId);

    // Find users based on extracted userIds
    const users = await User.find({ _id: { $in: userIds } }).exec();

    // Log successful retrieval
    logger.info(`Successfully retrieved users who attempted test ${testId}`);

    // Respond with the found users
    res.json({ users });
});

exports.testUserResponses = asyncErrors(async (req, res, next) => {
    const { testId, userId } = req.params;

    // Find the user attempt for the given user ID and test ID
    const userAttempt = await UserAttempt.findOne({ userId, testId })
        // .populate('userId', 'name email')
        .exec();

    // If no user attempt found, return an empty response
    if (!userAttempt) {
        return res.status(200).json({
            success: true,
            message: 'No response found for the given user ID and test ID',
            response: null,
        });
    }

    const message = 'User responses retrieved successfully';
    logger.info(message);

    const response = new ApiResponse(200, userAttempt.userResponses, message);
    // User attempt found, return the userResponses
    res.status(200).json({
        response,
    });
});
