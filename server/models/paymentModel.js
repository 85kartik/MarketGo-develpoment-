const mongoose = require("mongoose");

// Lightweight, gateway-agnostic payment record. Swap the create/verify
// logic in paymentController.js for a real gateway (Razorpay/Stripe/etc.)
// when you're ready to accept live payments; this model + flow will
// keep working as-is.
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    receiptId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
