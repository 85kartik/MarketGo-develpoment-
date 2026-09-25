const express = require("express");
const router = express.Router();

const {
  createOrderController,
  getMyOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
  cancelOrderController,
} = require("../controllers/orderController");

const {
  requireSignIn,
  isAdmin,
} = require("../middleware/authMiddleware");

// =======================
// CREATE ORDER
// =======================
router.post(
  "/create",
  requireSignIn,
  createOrderController
);

// =======================
// GET MY ORDERS
// =======================
router.get(
  "/my-orders",
  requireSignIn,
  getMyOrdersController
);

// =======================
// GET ALL ORDERS (ADMIN)
// =======================
router.get(
  "/all-orders",
  requireSignIn,
  isAdmin,
  getAllOrdersController
);

// =======================
// CANCEL MY ORDER
// =======================
router.put(
  "/cancel/:id",
  requireSignIn,
  cancelOrderController
);

// =======================
// UPDATE ORDER STATUS (ADMIN)
// =======================
router.put(
  "/status/:id",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);

module.exports = router;	