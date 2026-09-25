const Wishlist = require("../models/wishlistModel");
const Cart = require("../models/cartModel");

// GET LOGGED-IN USER'S WISHLIST
const getWishlistController = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user._id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total: items.length,
      wishlist: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching wishlist",
      error: error.message,
    });
  }
};

// ADD PRODUCT TO WISHLIST
const addToWishlistController = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "productId is required",
      });
    }

    let item = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    if (item) {
      return res.status(200).send({
        success: true,
        message: "Product already in wishlist",
        item,
      });
    }

    item = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).send({
      success: true,
      message: "Product added to wishlist",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};

// REMOVE SINGLE PRODUCT FROM WISHLIST
const removeFromWishlistController = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId,
    });

    res.status(200).send({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error removing from wishlist",
      error: error.message,
    });
  }
};

// CLEAR ENTIRE WISHLIST
const clearWishlistController = async (req, res) => {
  try {
    await Wishlist.deleteMany({ user: req.user._id });

    res.status(200).send({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error clearing wishlist",
      error: error.message,
    });
  }
};

// MOVE A WISHLIST ITEM INTO THE CART
const moveToCartController = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "productId is required",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        quantity: 1,
      });
    }

    await Wishlist.findOneAndDelete({
      user: req.user._id,
      product: productId,
    });

    res.status(200).send({
      success: true,
      message: "Product moved to cart",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error moving product to cart",
      error: error.message,
    });
  }
};

module.exports = {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
  clearWishlistController,
  moveToCartController,
};
