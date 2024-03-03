const express = require('express');
const { getTestHistory } = require('../controllers/testController');
const { getAvailableTests } = require('../controllers/testController');

const router = express.Router();

router.route('/user/:userId/tests/history').get(getTestHistory);
router.route('/user/:userId/tests/available').get(getAvailableTests);

module.exports = router;
