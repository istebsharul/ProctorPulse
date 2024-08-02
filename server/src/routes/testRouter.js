const express = require('express');
const {
    getTestHistory,
    getAvailableTests,
    getTestDetails,
    deleteTest,
    createTest,
    submitTest,
    testUserResponses,
    getTestResponses,
    getUserTestSubmitDetails,
    getAvailableTestsUser,
    isAttempted
} = require('../controllers/testController');
const { isAuthenticatedAdmin } = require('../middleware/authentication');

const router = express.Router();

//user routes
router.route('/user/:userId/tests/history').get(getTestHistory);
router.route('/user/:userId/tests/available').get(getAvailableTestsUser);
router.route('/user/:userId/test/:testId').get(getTestDetails);
router.route('/user/:userId/test/:testId/submit').post(submitTest);
router.route('/user/:userId/test/:testId/responses').get(testUserResponses);
router.route('/user/:userId/test/:testId/details').get(getUserTestSubmitDetails);
router.route('/user/test/attempted').post(isAttempted);

//admin routes
router
    .route('/admin/tests/:testId/delete')
    .delete(isAuthenticatedAdmin, deleteTest);
router.route('/admin/tests/create').post(isAuthenticatedAdmin, createTest);
router.route('/ranking/test/:testId').get(getTestResponses);
router.route('/admin/test/:adminId').get(getAvailableTests);

module.exports = router;
