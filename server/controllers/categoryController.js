const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }

    const existing = await Category.findOne({ name });

    if (existing) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category",
      error,
    });
  }
};

// Get All Categories
const getCategoryController = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      error,
    });
  }
};

// Get Single Category
const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting category",
      error,
    });
  }
};

// Update Category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Updating Category",
      error,
    });
  }
};

// Delete Category
const deleteCategoryController = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Deleting Category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getCategoryController,
  singleCategoryController,
  updateCategoryController,
  deleteCategoryController,
};