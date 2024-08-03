const ErrorHandler = require('../utils/errorHandlers');
const asyncErrors = require('../middleware/AsyncErrors');
const Question = require('../models/question.models');
const logger = require('../utils/logger');
const { isValidObjectId, isIdExists } = require('../utils/api/apiValidation');
const ApiResponse = require('../utils/api/apiResponse');

exports.createQuestion = async (req, res, next) => {
    // Extracting data from the request body
    const { title, options, correct_answer } = req.body;

    // Creating a new question instance
    const newQuestion = new Question({
        title,
        options,
        correct_answer,
    });

    // Saving the new question to the database
    await newQuestion.save();

    // Returning success response
    return newQuestion;
};

exports.getQuestionDetails = asyncErrors(async (req, res, next) => {
    const questionId = req.params.questionId;
    logger.info(`RequestBody: ${questionId}`);

    if (!isValidObjectId(questionId)) {
        const message = `questionId ${questionId} is not valid.`;
        logger.error(message);
        const response = new ApiResponse(400, null, message);
        return res.status(400).json(response);
    }

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            const message = `No question found with questionId ${questionId}`;
            logger.error(message);
            const response = new ApiResponse(404, null, message);
            return res.status(404).json(response);
        }

        logger.info('Question fetched successfully.');
        logger.info(question);

        const response = new ApiResponse(200, question);
        return res.status(200).json(response);
    } catch (err) {
        const message = `Failed to fetch the question with questionId ${questionId}. Reason: ${err}`;
        logger.error(message);
        return next(err);
    }
});