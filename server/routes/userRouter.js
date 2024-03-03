const express = require("express");
const isAuthenticatedUser = require("../middleware/authentication");

const {
  registerUser,
  loginUser,
  updateProfile,
  userProfile,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/:username").get(userProfile);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
