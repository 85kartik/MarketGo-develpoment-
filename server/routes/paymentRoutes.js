const express = require("express");
const router = express.Router();

const {
  createPaymentController,
  verifyPaymentController,
} = require("../controllers/paymentController");

const { requireSignIn } = require("../middleware/authMiddleware");

// Create Payment Order
router.post("/create-order", requireSignIn, createPaymentController);

// Verify Payment
router.post("/verify", requireSignIn, verifyPaymentController);

module.exports = router;
