const express = require('express');
const {
    getTestHistory,
    getAvailableTests,
    getTestDetails,
    deleteTest,
    createTest,
    submitTest,
} = require('../controllers/testController');
const { isAuthenticatedAdmin } = require('../middleware/authentication');

const router = express.Router();

//user routes
router.route('/user/:userId/tests/history').get(getTestHistory);
router.route('/user/:userId/tests/available').get(getAvailableTests);
router.route('/user/:userId/test/:testId').get(getTestDetails);
router.route('/user/:userId/test/:testId/submit').post(submitTest);


//admin routes
router.route('/admin/tests/:testId/delete').delete(isAuthenticatedAdmin, deleteTest);
router.route('/admin/tests/create').post(isAuthenticatedAdmin, createTest);

module.exports = router;
