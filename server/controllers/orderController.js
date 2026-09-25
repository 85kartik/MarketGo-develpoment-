const Order = require("../models/orderModel");
const sendEmail = require("../helper/sendEmail");
const User = require("../models/userModels");

// ==========================
// CREATE ORDER
// ==========================
const createOrderController = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    const user = await User.findById(req.user._id);

    if (user) {
      await sendEmail(
        user.email,
        "🛒 Order Placed Successfully",
        `
        <div style="font-family:Arial;padding:20px">
            <h2>Hello ${user.name},</h2>

            <h3>Thank you for shopping with MarketGo ❤️</h3>

            <p>Your order has been placed successfully.</p>

            <hr>

            <p><b>Order ID:</b> ${order._id}</p>
            <p><b>Total Amount:</b> ₹${order.totalAmount}</p>
            <p><b>Payment:</b> ${order.paymentMethod}</p>
            <p><b>Status:</b> ${order.orderStatus}</p>

            <hr>

            <p>We'll notify you when your order is confirmed.</p>

            <br>

            <b>Team MarketGo</b>
        </div>
        `
      );
    }

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating order",
      error: error.message,
    });
  }
};


// ==========================
// GET MY ORDERS
// ==========================
const getMyOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .populate("user", "name email");

    res.status(200).send({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// ==========================
// GET ALL ORDERS (ADMIN)
// ==========================
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching all orders",
      error: error.message,
    });
  }
};


// ==========================
// UPDATE ORDER STATUS (ADMIN)
// ==========================
const updateOrderStatusController = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    // Update order and get user details
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    ).populate("user");


    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }


    // Send status update email
    await sendEmail(
      order.user.email,
      `Order ${orderStatus}`,
      `
      <div style="font-family:Arial;padding:20px">

          <h2>Hello ${order.user.name}</h2>

          <p>Your Order Status has been updated.</p>

          <hr>

          <h3>Status : ${orderStatus}</h3>

          <p>Order ID : ${order._id}</p>

          <p>Total : ₹${order.totalAmount}</p>

          <br>

          <b>Thank you for shopping with MarketGo ❤️</b>

      </div>
      `
    );


    res.status(200).send({
      success: true,
      message: "Order status updated",
      order,
    });


  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};


// ==========================
// CANCEL MY ORDER
// ==========================
const cancelOrderController = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    if (["Shipped", "Delivered", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).send({
        success: false,
        message: `Order cannot be cancelled once it is ${order.orderStatus}`,
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).send({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  getMyOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
  cancelOrderController,
};