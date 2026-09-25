const express = require("express");
const router = express.Router();

const {
  getCouponsController,
  createCouponController,
  updateCouponController,
  deleteCouponController,
  validateCouponController,
} = require("../controllers/couponController");

const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

// Get All Coupons (admin)
router.get("/", requireSignIn, isAdmin, getCouponsController);

// Create Coupon (admin)
router.post("/", requireSignIn, isAdmin, createCouponController);

// Validate Coupon (any logged-in user, at checkout)
router.post("/validate", requireSignIn, validateCouponController);

// Update Coupon (admin)
router.put("/:id", requireSignIn, isAdmin, updateCouponController);

// Delete Coupon (admin)
router.delete("/:id", requireSignIn, isAdmin, deleteCouponController);

module.exports = router;
