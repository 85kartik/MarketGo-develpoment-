const Coupon = require("../models/couponModel");

// GET ALL COUPONS (admin)
const getCouponsController = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total: coupons.length,
      coupons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching coupons",
      error: error.message,
    });
  }
};

// CREATE COUPON (admin)
const createCouponController = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiryDate } =
      req.body;

    if (!code || !discountValue) {
      return res.status(400).send({
        success: false,
        message: "code and discountValue are required",
      });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      minOrderAmount,
      expiryDate,
    });

    res.status(201).send({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating coupon",
      error: error.message,
    });
  }
};

// UPDATE COUPON (admin)
const updateCouponController = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!coupon) {
      return res.status(404).send({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating coupon",
      error: error.message,
    });
  }
};

// DELETE COUPON (admin)
const deleteCouponController = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).send({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting coupon",
      error: error.message,
    });
  }
};

// VALIDATE COUPON (customer, applied at checkout)
const validateCouponController = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({
      code: (code || "").toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).send({
        success: false,
        message: "Invalid or inactive coupon",
      });
    }

    if (coupon.expiryDate && coupon.expiryDate < new Date()) {
      return res.status(400).send({
        success: false,
        message: "Coupon has expired",
      });
    }

    if (orderAmount !== undefined && orderAmount < coupon.minOrderAmount) {
      return res.status(400).send({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    const discount =
      coupon.discountType === "percentage"
        ? (Number(orderAmount || 0) * coupon.discountValue) / 100
        : coupon.discountValue;

    res.status(200).send({
      success: true,
      coupon,
      discount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error validating coupon",
      error: error.message,
    });
  }
};

module.exports = {
  getCouponsController,
  createCouponController,
  updateCouponController,
  deleteCouponController,
  validateCouponController,
};
