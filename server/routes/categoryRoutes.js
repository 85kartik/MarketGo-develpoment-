const express = require("express");
const router = express.Router();

const {
  createCategoryController,
  getCategoryController,
  singleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

// Create Category
router.post("/create",requireSignIn,isAdmin,createCategoryController);

// Get All Categories
router.get("/get", getCategoryController);

// Get Single Category
router.get("/:slug", singleCategoryController);

// Update Category
router.put(
  "/update/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Delete Category
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;