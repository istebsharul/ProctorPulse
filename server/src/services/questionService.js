const logger = require('../utils/logger');
const Question = require('../models/question.models');
const { isValidObjectId, isIdExists } = require('../utils/api/apiValidation');

const questionDetails = async (questionId) => {
    try {
        if (!isValidObjectId(questionId)) {
            throw new Error(`Question ID ${questionId} is not valid.`);
        }

        const doesQuestionExists = await isIdExists(Question, questionId);
        if (!doesQuestionExists) {
            throw new Error(`Question with ID ${questionId} does not exist.`);
        }

        const questionDetails = await Question.findOne({
            _id: questionId,
        });
        return questionDetails;
    } catch (error) {
        logger.error(
            `Failed to fetch question details for ID ${questionId}: ${error.message}`
        );
        throw error;
    }
};

const formattedTestDetails = async (testDetails) => {
    try {
        const formattedQuestions = await Promise.all(
            testDetails.questions.map(async (questionId) => {
                try {
                    return await questionDetails(questionId);
                } catch (error) {
                    logger.error(
                        `Error fetching question details for ID ${questionId}: ${error.message}`
                    );
                    throw error;
                }
            })
        );

        testDetails.questions = formattedQuestions;

        return testDetails;
    } catch (error) {
        throw error;
    }
};

module.exports = { questionDetails, formattedTestDetails };
