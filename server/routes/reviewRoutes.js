const express = require("express");
const router = express.Router();

const {
  createReviewController,
  getReviewsController,
  updateReviewController,
  deleteReviewController,
  averageRatingController,
} = require("../controllers/reviewController");

const {
  requireSignIn,
} = require("../middleware/authMiddleware");

// Create Review
router.post(
  "/create",
  requireSignIn,
  createReviewController
);

// Get Reviews by Product
router.get(
  "/product/:productId",
  getReviewsController
);

// Average Rating
router.get(
  "/average/:productId",
  averageRatingController
);

// Update Review
router.put(
  "/update/:id",
  requireSignIn,
  updateReviewController
);

// Delete Review
router.delete(
  "/delete/:id",
  requireSignIn,
  deleteReviewController
);

module.exports = router;