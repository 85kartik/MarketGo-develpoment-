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
  isAdmin,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
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
  isAdmin,
  upload.single("photo"),
  updateProductController
);

// Delete Product
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

module.exports = router;