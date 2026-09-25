const Product = require("../models/productModel");
const slugify = require("slugify");

// ==========================
// CREATE PRODUCT
// ==========================
const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      lowStockLimit,
    } = req.body;

    if (!name)
      return res.status(400).send({
        success: false,
        message: "Product name is required",
      });

    if (!description)
      return res.status(400).send({
        success: false,
        message: "Description is required",
      });

    if (!price)
      return res.status(400).send({
        success: false,
        message: "Price is required",
      });

    if (!quantity)
      return res.status(400).send({
        success: false,
        message: "Quantity is required",
      });

    if (!category)
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).send({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      sold: 0,
      lowStockLimit: lowStockLimit || 5,
      inStock: quantity > 0,
      category,
      shipping,
      photo: req.file ? req.file.path : "",
    });

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// ==========================
// GET ALL PRODUCTS (with optional ?category=&keyword=&page=&limit=)
// ==========================
const getProductsController = async (req, res) => {
  try {
    const { category, keyword, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (keyword) filter.name = { $regex: keyword, $options: "i" };

    const products = await Product.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).send({
      success: true,
      total,
      page: Number(page),
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// ==========================
// GET SINGLE PRODUCT (by id or slug)
// ==========================
const getProductController = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const product = await Product.findOne(query).populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// ==========================
// UPDATE PRODUCT
// ==========================
const updateProductController = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.name) updates.slug = slugify(updates.name);
    if (req.file) updates.photo = req.file.path;
    if (updates.quantity !== undefined) {
      updates.inStock = Number(updates.quantity) > 0;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// ==========================
// DELETE PRODUCT
// ==========================
const deleteProductController = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
};