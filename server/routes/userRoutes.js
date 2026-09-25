const express = require("express");

const {
  registerController,
  loginController,
  getProfileController,
  updateProfileController,
  forgotPasswordController,
  verifyOtpController,
  resetPasswordController,
} = require("../controllers/userControllers");

const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================
// REGISTER USER
// ==========================
router.post(
  "/register",
  registerController
);


// ==========================
// LOGIN USER
// ==========================
router.post(
  "/login",
  loginController
);


// ==========================
// GET USER PROFILE
// ==========================
router.get(
  "/profile",
  requireSignIn,
  getProfileController
);


// ==========================
// UPDATE USER PROFILE
// ==========================
router.put(
  "/profile",
  requireSignIn,
  updateProfileController
);


// ==========================
// FORGOT PASSWORD - SEND OTP
// ==========================
router.post(
  "/forgot-password",
  forgotPasswordController
);


// ==========================
// VERIFY OTP
// ==========================
router.post(
  "/verify-otp",
  verifyOtpController
);


// ==========================
// RESET PASSWORD - VERIFY OTP
// ==========================
router.post(
  "/reset-password",
  resetPasswordController
);


module.exports = router;