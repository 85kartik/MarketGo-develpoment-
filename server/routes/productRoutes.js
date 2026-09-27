const express = require("express");
const router = express.Router();

const {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

const {
  requireSignIn,
  isVendor,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isVendor,
  upload.single("photo"),
  createProductController
);

// Get All Products
router.get("/", getProductsController);

// Get Single Product (by id or slug)
router.get("/:idOrSlug", getProductController);

// Update Product
router.put(
  "/update/:id",
  requireSignIn,
  isVendor,
  upload.single("photo"),
  updateProductController
);

// Delete Product
router.delete(
  "/delete/:id",
  requireSignIn,
  isVendor,
  deleteProductController
);

module.exports = router;``