const ErrorHandler = require('../utils/errorHandlers');
const asyncErrors = require('../middleware/AsyncErrors');
const Question = require('../models/user.models');

exports.createQuestion = asyncErrors(async (req, res, next) => {
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
    return res
        .status(201)
        .json({
            message: 'Question created successfully',
            question: newQuestion,
        });
});
