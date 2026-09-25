const User = require("../models/userModels");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Order = require("../models/orderModel");
const Review = require("../models/reviewModel");

// ==========================
// ADMIN DASHBOARD
// ==========================
const adminDashboardController = async (req, res) => {
  try {
    // Counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReviews = await Review.countDocuments();

    // Order Status Counts
    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const confirmedOrders = await Order.countDocuments({
      orderStatus: "Confirmed",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    // Revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Latest Orders
    const latestOrders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 })
      .limit(5);

    // Latest Users
    const latestUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly Sales
    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalReviews,

        pendingOrders,
        confirmedOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,

        totalRevenue,

        latestOrders,
        latestUsers,

        monthlySales,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error loading dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  adminDashboardController,
};