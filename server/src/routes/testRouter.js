const express = require('express');
const { getTestHistory } = require('../controllers/testController');

const router = express.Router();

router.route('/user/:userId/tests/history').get(getTestHistory);

module.exports = router;
