const express = require('express');
const { getTestHistory, deleteTest } = require('../controllers/testController');

const router = express.Router();


//user routes
router.route('/user/:userId/tests/history').get(getTestHistory);



//admin routes 

router.route('/admin/tests/:testId/delete').delete(deleteTest);


module.exports = router;
