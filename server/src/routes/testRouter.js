const express = require('express');
const {
    getTestHistory,
    getAvailableTests,
    getTestDetails,
} = require('../controllers/testController');

const router = express.Router();

router.route('/user/:userId/tests/history').get(getTestHistory);
router.route('/user/:userId/tests/available').get(getAvailableTests);
router.route('/user/:userId/test/:testId').get(getTestDetails);

module.exports = router;
