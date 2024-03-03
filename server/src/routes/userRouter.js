const express = require('express');
const { isAuthenticatedUser } = require('../middleware/authentication');

const {
    registerUser,
    loginUser,
    updateProfile,
    userProfile,
    forgotPassword,
    resetPassword,
    updatePassword,
} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile/:username').get(userProfile);
router.route('/profile/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

module.exports = router;
