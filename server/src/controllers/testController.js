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
const Admin = require('../models/admin.models');
const AVLTree = require('../utils/AVLTree');

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

// Get Available Test -> Fetching all the Test assigned by a particular admin
exports.getAvailableTests = asyncErrors(async (req, res, next) => {
    const adminId = req.params.adminId;
    logger.info(`RequestBody: ${adminId}`);

    if (!isValidObjectId(adminId)) {
        message = `UserId ${adminId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }
    const doesUserExists = await isIdExists(Admin, adminId);

    logger.info(`doesUser: ${doesUserExists}`);
    if (!doesUserExists) {
        message = `Admin with adminId ${adminId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        const availableTests = await Test.find({ createdBy: adminId });
        // logger.info('Available tests fetched successfully.');
        // logger.info(availableTests);

        const formattedTests = [];

        // for (const test of availableTests) {
        //     let userTestAttempt;
        //     try {
        //         userTestAttempt = await UserTestAttempt.findOne({
        //             user_id: userId,
        //             test_id: test._id,
        //         });
        //     } catch (err) {
        //         const message = `Failed to fetch the user test attempted with test_id ${test._id}. Reason: ${err}`;
        //         logger.error(message);
        //         return next(err);
        //     }

        //     const status = userTestAttempt ? 'Completed' : 'Available';

        //     formattedTests.push({
        //         testId: test._id,
        //         name: test.name,
        //         subject: test.subject,
        //         duration: test.duration.toString(), // Convert duration to string if needed
        //         status: status,
        //     });
        // }

        const response = new ApiResponse(200, availableTests);
        return res.status(200).json(response);
    } catch (err) {
        const message = `Failed to fetch available tests for Admin with AdminId ${adminId}. Reason: ${err}`;
        logger.error(message);
        return next(err);
    }
});

exports.getAvailableTestsUser = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    logger.info(`RequestBody: ${userId}`);

    if (!isValidObjectId(userId)) {
        const message = `UserId ${userId} is not valid.`;
        logger.error(message);
        return res.status(400).json(new ApiResponse(400, null, message));
    }

    const doesUserExists = await isIdExists(User, userId);
    logger.info(`doesUser: ${doesUserExists}`);

    if (!doesUserExists) {
        const message = `User with userId ${userId} does not exist.`;
        logger.error(message);
        return res.status(404).json(new ApiResponse(404, null, message));
    }

    try {
        const availableTests = await Test.find({ users: userId });
        logger.info('Available tests fetched successfully.');

        if (!availableTests || availableTests.length === 0) {
            const message = `No available tests found for User with UserId ${userId}.`;
            logger.info(message);
            return res.status(404).json(new ApiResponse(404, null, message));
        }

        return res.status(200).json(new ApiResponse(200, availableTests));
    } catch (err) {
        const message = `Failed to fetch available tests for User with UserId ${userId}. Reason: ${err.message}`;
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

    logger.info(`doesUser: ${JSON.stringify(doesUserExists)}`);
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
        message = `Failed to get the details of the test ${testId} of the user ${userId}. Reason: ${err}`;
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

// exports.createTest = asyncErrors(async (req, res, next) => {
//     const { testName, subject, duration, questions, allowedUsers } = req.body;

//     const questionIds = [];

//     console.log(questions);

//     for (const questionData of questions) {
//         const response = await createQuestion({ body: questionData });

//         if (response && response._id) {
//             // console.log("hello",response._id);
//             questionIds.push(response._id);
//             // console.log("Questions Id", questionIds);
//         } else {
//             const errorMessage = 'Failed to create question';
//             logger.error(errorMessage);
//             return next(new Error(errorMessage));
//         }
//     }
//     console.log("name:", testName, "subject:", subject, "duration:", duration, "questions:", questions, "allowed Users:", allowedUsers,)

//     const newTest = new Test({
//         name: testName,
//         subject,
//         duration,
//         questions: questionIds,
//         users: allowedUsers,
//         createdBy: req.admin._id,
//     });

//     await newTest.save();

//     const successMessage = 'Test created successfully';
//     logger.info(successMessage);
//     return res.status(201).json({ message: successMessage, test: newTest });
// });

const crypto = require('crypto');

exports.createTest = asyncErrors(async (req, res, next) => {
    const { name, subject, duration, questions, allowedUsers } = req.body;
    const testName = name
    //console.log(req.body)

    const questionIds = [];

    for (const questionData of questions) {
        const response = await createQuestion({ body: questionData });
        // console.log(response)

        if (response && response._id) {
            questionIds.push(response._id);
        } else {
            const errorMessage = 'Failed to create question';
            logger.error(errorMessage);
            return next(new Error(errorMessage));
        }
    }


    // Generate a random password for the test
    const password = crypto.randomBytes(8).toString('hex');
    console.log("Test Name: ", testName)
    const newTest = new Test({
        name: testName,
        subject,
        duration,
        questions: questionIds,
        users: allowedUsers,
        password: password, // Store the test password
        createdBy: req.admin._id,
    });
    //console.log(newTest)

    await newTest.save();

    const testId = newTest._id; // Get the test ID after saving

    const successMessage = 'Test created successfully';
    logger.info(successMessage);
    return res.status(201).json({
        message: successMessage,
        testId: testId,
        password: password
    });
});

exports.getTestResponses = asyncErrors(async (req, res, next) => {
    try {
        const { testId } = req.params;

        // Find all user attempts for the given testId and populate user details in a single query
        const userAttempts = await UserTestAttempt.find({ test_id: testId }).populate('user_id', 'username');

        if (!userAttempts || userAttempts.length === 0) {
            logger.warn(`No attempts found for test ${testId}`);
            return res.status(404).json({ message: 'No attempts found for this test' });
        }

        logger.info(userAttempts);

        // Sort user attempts based on total_score in descending order
        userAttempts.sort((a, b) => b.total_score - a.total_score);
    
        // Extract username and total_score from sorted userAttempts
        const users = userAttempts.map(attempt => ({
            user_id: attempt.user_id,
            total_score: attempt.total_score,
            user_response: attempt.user_response,
            user_imageUrl: attempt.user_imageUrl,
            user_name: attempt.user_name,
        }));

        // Log successful retrieval
        logger.info(`Successfully retrieved and sorted users who attempted test ${testId}`);

        // Respond with the sorted users
        res.json({ users });
    } catch (error) {
        logger.error(`Error retrieving test responses: ${error.message}`);
        next(error);
    }
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

exports.submitTest = asyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    const testId = req.params.testId;
    const { answers, user_name, user_imageUrl } = req.body;
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
            const message = 'Test time is over.';
            logger.error(message);
            const response = new ApiResponse(400, null, message);
            return res.status(400).json(response);
        }



        // Process submitted answers
        let totalScore = 0;
        let attemptedQuestions = 0;
        let skippedQuestions = 0;
        const userResponses = [];

        for (const answer of answers) {
            const { questionId, user_answer: userAnswer } = answer;
            console.log(`Processing questionId: ${questionId}, user_answer: ${userAnswer}`);
            if (!questionId) continue;

            const question = await Question.findById(questionId);
            if (!question) continue;

            userResponses.push({
                question_id: questionId,
                user_answer: userAnswer,
            });

            if (userAnswer === -1) {
                skippedQuestions++;
                console.log(`Skipped questionId: ${questionId}`);
            } else {
                attemptedQuestions++;
                if (userAnswer === question.correct_answer) {
                    totalScore += 1;
                }
            }
        }

        console.log("Total Score", totalScore);
        console.log("Attempt Question", attemptedQuestions);
        console.log("Skipped Question", skippedQuestions);

        // Save the attempt details in the database
        const userTestAttempt = new UserTestAttempt({
            user_id: userId,
            user_name,
            user_imageUrl,
            test_id: testId,
            attempt_date: new Date(),
            total_score: totalScore,
            attempted_questions: attemptedQuestions,
            skipped_questions: skippedQuestions,
            user_response: userResponses,
        });

        await userTestAttempt.save();

        // Return success response
        const response = new ApiResponse(200, {
            message: 'Test submitted successfully.',
        });
        return res.status(200).json(response);

    } catch (err) {
        // Handle errors
        logger.error(`Failed to submit test: ${err.message}`);
        return next(err);
    }
});


exports.getUserTestSubmitDetails = asyncErrors(async (req, res, next) => {
    const { userId, testId, passWord } = req.params;
    logger.info(req);

    if (!isValidObjectId(userId)) {
        const message = `UserId ${userId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    const doesUserExists = await isIdExists(User, userId);
    logger.info(`doesUserExists: ${JSON.stringify(doesUserExists)}`);

    if (!doesUserExists) {
        const message = `User with userId ${userId} does not exist.`;
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

    const doesTestExists = await isIdExists(Test, testId);
    logger.info(`doesTestExists: ${doesTestExists}`);

    if (!doesTestExists) {
        const message = `Test with testId ${testId} does not exist.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        // Validate the test password
        const test = await Test.findById(testId);
        if (!test) {
            const message = `Test with testId ${testId} could not be found.`;
            logger.error(message);
            const response = new ApiResponse(400, null, message);
            return res.status(400).json(response);
        }

        if (test.password !== passWord) {
            const message = `Incorrect password for testId ${testId}.`;
            logger.error(message);
            const response = new ApiResponse(401, null, message); // Unauthorized status code
            return res.status(401).json(response);
        }

        // Fetch the user's test submission details
        const userTestSubmitDetails = await UserTestAttempt.findOne({
            user_id: userId,
            test_id: testId,
        });

        logger.info(userTestSubmitDetails);
        const response = new ApiResponse(200, userTestSubmitDetails);
        return res.status(200).json(response);

    } catch (err) {
        const message = `Failed to get the details of the test ${testId} of the user ${userId}. Reason: ${err.message}`;
        logger.error(message);
        return next(err);
    }
});


exports.isAttempted = asyncErrors(async (req, res) => {
    const { userId, testId } = req.body;

    try {
        const userAttempted = await UserTestAttempt.findOne({ user_id: userId, test_id: testId });

        if (userAttempted) {
            logger.info("User Already Attempted Test!");
            return res.status(200).json({ attempted: true });
        }

        return res.status(200).json({ attempted: false });
    } catch (error) {
        logger.error(error.message);
        return next(error);
    }
});