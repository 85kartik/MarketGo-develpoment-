const Cart = require("../models/cartModel");

// ADD PRODUCT TO CART
const addToCartController = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const user = req.user._id;

    let cartItem = await Cart.findOne({ user, product });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).send({
        success: true,
        message: "Cart updated successfully",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user,
      product,
      quantity: quantity || 1,
    });

    res.status(201).send({
      success: true,
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error adding product to cart",
      error,
    });
  }
};

// UPDATE CART QUANTITY
const updateCartController = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error updating cart",
      error,
    });
  }
};

// REMOVE ITEM
const removeCartController = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error removing item",
      error,
    });
  }
};

// CLEAR CART
  const clearCartController = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(200).send({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error clearing cart",
      error,
    });
  }
};

// GET MY CART
const getCartController = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    })
      .populate("product")
      .populate("user", "name email");

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + (item.product ? item.product.price * item.quantity : 0),
      0
    );

    const delivery = subtotal > 0 && subtotal < 500 ? 40 : 0;
    const gst = Math.round(subtotal * 0.05);
    const discount = 0;
    const total = subtotal + delivery + gst - discount;

    res.status(200).send({
      success: true,
      totalItems: cart.length,
      cart,
      items: cart,
      summary: {
        subtotal,
        delivery,
        discount,
        gst,
        total,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error getting cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCartController,
  getCartController,
  updateCartController,
  removeCartController,
  clearCartController,
};