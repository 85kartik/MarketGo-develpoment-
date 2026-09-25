const express = require("express");
const router = express.Router();

const {
  addToCartController,
  getCartController,
  updateCartController,
  removeCartController,
  clearCartController,
} = require("../controllers/cartController");

const { requireSignIn } = require("../middleware/authMiddleware");

// Add Product to Cart
router.post("/add", requireSignIn, addToCartController);

// Get Logged-in User Cart
router.get("/my-cart", requireSignIn, getCartController);

// Update Product Quantity
router.put("/update/:id", requireSignIn, updateCartController);

// Remove Product from Cart
router.delete("/remove/:id", requireSignIn, removeCartController);

// Clear Entire Cart
router.delete("/clear", requireSignIn, clearCartController);

module.exports = router;