const express = require('express');
const {
    getTestHistory,
    getAvailableTests,
    getTestDetails,
    deleteTest,
} = require('../controllers/testController');

const router = express.Router();

//user routes
router.route('/user/:userId/tests/history').get(getTestHistory);
router.route('/user/:userId/tests/available').get(getAvailableTests);
router.route('/user/:userId/test/:testId').get(getTestDetails);

//admin routes
router.route('/admin/tests/:testId/delete').delete(deleteTest);

module.exports = router;
