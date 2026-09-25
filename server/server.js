const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const couponRoutes = require("./routes/couponRoutes");
const homeRoutes = require("./routes/homeRoutes");

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/home", homeRoutes);
// Home Route
app.get("/", (req, res) => {
  res.send("🚀 MarketGo API Running...");
});

// Start Server
const PORT = process.env.PORT || 5252;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});