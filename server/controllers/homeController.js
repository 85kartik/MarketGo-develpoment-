const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

// Composite payload for the app's home screen. There's no separate
// "banner"/"offer" model in this project, so those come back as empty
// arrays for now — wire them up to a real model later if you add
// merchandising banners.
const getHomeController = async (req, res) => {
  try {
    const categories = await Category.find().limit(10);

    const featuredProducts = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(10);

    const bestSelling = await Product.find()
      .populate("category")
      .sort({ sold: -1 })
      .limit(10);

    const newArrivals = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).send({
      success: true,
      banners: [],
      offers: [],
      categories,
      featuredProducts,
      bestSelling,
      newArrivals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error loading home data",
      error: error.message,
    });
  }
};

module.exports = {
  getHomeController,
};
