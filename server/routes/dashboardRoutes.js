const express = require("express");
const router = express.Router();

const {
  adminDashboardController,
} = require("../controllers/dashboardController");

const {
  requireSignIn,
  isAdmin,
} = require("../middleware/authMiddleware");

router.get(
  "/admin-dashboard",
  requireSignIn,
  isAdmin,
  adminDashboardController
);

module.exports = router;