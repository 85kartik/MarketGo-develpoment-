const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModels");

// ===============================
// ADMIN ANALYTICS
// ===============================
const analyticsController = async (req, res) => {
  try {
    // Today's Sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
    ]);

    // Monthly Sales
    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Payment Method
    const paymentAnalytics = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          totalOrders: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Order Status
    const orderStatusAnalytics = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // Top Selling Products
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },

      {
        $group: {
          _id: "$products.product",
          sold: { $sum: "$products.quantity" },
        },
      },

      {
        $sort: {
          sold: -1,
        },
      },

      {
        $limit: 5,
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      {
        $unwind: "$product",
      },

      {
        $project: {
          _id: 1,
          sold: 1,
          name: "$product.name",
          price: "$product.price",
        },
      },
    ]);

    // User Growth
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          users: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Product Count
    const totalProducts = await Product.countDocuments();

    // User Count
    const totalUsers = await User.countDocuments();

    // Order Count
    const totalOrders = await Order.countDocuments();

    res.status(200).send({
      success: true,

      overview: {
        totalProducts,
        totalUsers,
        totalOrders,
      },

      todaySales: todaySales[0] || {
        revenue: 0,
        orders: 0,
      },

      monthlySales,

      paymentAnalytics,

      orderStatusAnalytics,

      topProducts,

      userGrowth,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Analytics Error",
      error: error.message,
    });

  }
};

module.exports = {
  analyticsController,
};