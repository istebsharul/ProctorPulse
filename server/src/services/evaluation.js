// Import necessary modules and models
const Test = require('../models/test.models');
const Question = require('../models/question.models');
const logger = require('../utils/logger');

// External function to calculate score based on user responses and test data
async function calculateScore(userResponses, testId) {
    let score = 0;

    try {
        // Retrieve test data from the database using the provided test ID
        const testData = await Test.findById(testId).exec();

        if (!testData) {
            const errorMessage = 'Test not found';
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }

        // Create a map of question IDs to their correct answers
        const correctAnswersMap = new Map();

        // Iterate over the questions in testData
        for (const questionId of testData.questions) {
            // Find the question document using the question ID
            const question = await Question.findById(questionId).exec();

            // Check if the question exists
            if (question) {
                // Add the question ID and correct answer to the map
                correctAnswersMap.set(
                    question._id.toString(),
                    question.correct_answer
                );
                logger.info(
                    `Question ID: ${question._id.toString()}, Correct Answer: ${
                        question.correct_answer
                    }`
                );
            }
        }

        // Iterate over each user response
        for (const userResponse of userResponses) {
            // Get the correct answer for the current question
            const correctAnswer = correctAnswersMap.get(
                userResponse.questionId
            );

            logger.info(`Question ID from user: ${userResponse.questionId}`);
            logger.info(`Correct Answer from question: ${correctAnswer}`);
            logger.info(`User Response Answer: ${userResponse.answer}`);

            // Check if the correct answer exists and matches the user's answer
            if (correctAnswer && correctAnswer === userResponse.answer) {
                score++;
                logger.info('Correct');
            }
        }
    } catch (error) {
        logger.error(`Error calculating score: ${error.message}`);
        throw error;
    }

    logger.info(`Final Score: ${score}`);
    return score;
}

module.exports = calculateScore;
