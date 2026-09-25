const express = require("express");
const router = express.Router();

const {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
  clearWishlistController,
  moveToCartController,
} = require("../controllers/wishlistController");

const { requireSignIn } = require("../middleware/authMiddleware");

// Get Logged-in User's Wishlist
router.get("/", requireSignIn, getWishlistController);

// Add Product to Wishlist
router.post("/", requireSignIn, addToWishlistController);

// Clear Entire Wishlist (must be before /:productId)
router.delete("/clear", requireSignIn, clearWishlistController);

// Move Wishlist Item to Cart
router.post("/move-to-cart", requireSignIn, moveToCartController);

// Remove Single Product from Wishlist
router.delete("/:productId", requireSignIn, removeFromWishlistController);

module.exports = router;
