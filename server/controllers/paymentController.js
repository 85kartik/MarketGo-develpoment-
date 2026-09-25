const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");

// CREATE A PAYMENT "ORDER"
// This is a gateway-agnostic stub so the app has a real, working
// create -> verify flow out of the box. To go live, replace the body
// of this function with a call to your payment gateway's order-create
// API (e.g. Razorpay `instance.orders.create(...)`) and return the
// gateway's order id instead of the local receiptId.
const createPaymentController = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount) {
      return res.status(400).send({
        success: false,
        message: "amount is required",
      });
    }

    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    const payment = await Payment.create({
      user: req.user._id,
      order: orderId || null,
      amount,
      receiptId,
      status: "created",
    });

    res.status(201).send({
      success: true,
      message: "Payment order created",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating payment order",
      error: error.message,
    });
  }
};

// VERIFY A PAYMENT
// Swap this for real signature verification against your gateway
// (e.g. HMAC-SHA256 of order_id|payment_id using your key secret)
// once you wire up a real provider.
const verifyPaymentController = async (req, res) => {
  try {
    const { receiptId, orderId } = req.body;

    if (!receiptId) {
      return res.status(400).send({
        success: false,
        message: "receiptId is required",
      });
    }

    const payment = await Payment.findOne({
      receiptId,
      user: req.user._id,
    });

    if (!payment) {
      return res.status(404).send({
        success: false,
        message: "Payment not found",
      });
    }

    payment.status = "paid";
    if (orderId) payment.order = orderId;
    await payment.save();

    if (payment.order) {
      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: "Paid",
      });
    }

    res.status(200).send({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

module.exports = {
  createPaymentController,
  verifyPaymentController,
};
