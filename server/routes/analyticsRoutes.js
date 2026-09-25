const express = require("express");
const router = express.Router();

const {
  analyticsController,
} = require("../controllers/analyticsController");

const {
  requireSignIn,
  isAdmin,
} = require("../middleware/authMiddleware");

router.get(
  "/admin-analytics",
  requireSignIn,
  isAdmin,
  analyticsController
);

module.exports = router;