const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, updatePassword } = require('../controllers/userController');
const { isAuthenticatiedUser} = require("../middleware/authentication");

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route("/password/update").put(isAuthenticatiedUser,updatePassword)

module.exports = router;
