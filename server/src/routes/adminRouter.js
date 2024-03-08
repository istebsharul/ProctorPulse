const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    profileAdmin,
    updateProfileAdmin,
    forgotPasswordAdmin,
    resetPasswordAdmin,
    updatePasswordAdmin,
} = require('../controllers/adminController');

const {
    isAuthenticatedUser,
    isAuthenticatedAdmin,
} = require('../middleware/authentication');

const router = express.Router();

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/profile/:username').get(profileAdmin);
router.route('/profile/update').put(isAuthenticatedAdmin, updateProfileAdmin);
router.route('/password/forgot').post(forgotPasswordAdmin);
router.route('/password/reset/:token').put(resetPasswordAdmin);
router.route('/password/update').put(isAuthenticatedAdmin, updatePasswordAdmin);

module.exports = router;
