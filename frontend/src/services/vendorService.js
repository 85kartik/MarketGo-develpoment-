import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

// This project only has an "admin" role (no separate vendor role), so
// these calls map onto the admin-protected endpoints the backend
// actually exposes. requireSignIn + isAdmin on the server will reject
// anything from a non-admin user.

const getDashboard = () => api.get(ENDPOINTS.ADMIN_DASHBOARD);

const getProducts = () => api.get(ENDPOINTS.PRODUCTS);

const addProduct = (formData) =>
  api.post(ENDPOINTS.PRODUCT_CREATE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const updateProduct = (id, formData) =>
  api.put(`${ENDPOINTS.PRODUCT_UPDATE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const deleteProduct = (id) => api.delete(`${ENDPOINTS.PRODUCT_DELETE}/${id}`);

const getOrders = () => api.get(ENDPOINTS.ALL_ORDERS);

const updateOrderStatus = (id, data) =>
  api.put(`${ENDPOINTS.ORDER_STATUS}/${id}`, data);

// No dedicated inventory endpoint exists yet — the product list already
// carries quantity/inStock/lowStockLimit, so reuse it here.
const getInventory = () => api.get(ENDPOINTS.PRODUCTS);

// Adjust stock via the regular product-update endpoint.
const updateInventory = (id, data) =>
  api.put(`${ENDPOINTS.PRODUCT_UPDATE}/${id}`, data);

// No dedicated revenue endpoint — the admin dashboard already returns
// totalRevenue / monthlySales.
const getRevenue = () => api.get(ENDPOINTS.ADMIN_DASHBOARD);

const getAnalytics = () => api.get(ENDPOINTS.ADMIN_ANALYTICS);

// No vendor-specific review moderation endpoint exists yet.
// TODO: add a backend route if per-product review management is needed.
const getReviews = () => Promise.resolve({ data: { success: true, reviews: [] } });

const getProfile = () => api.get(ENDPOINTS.PROFILE);

const updateProfile = (data) => api.put(ENDPOINTS.PROFILE, data);

// Alias kept because VendorProfileScreen calls it by this name.
const getVendorProfile = getProfile;
const updateVendorProfile = updateProfile;

const getCoupons = () => api.get(ENDPOINTS.COUPONS);

const addCoupon = (data) => api.post(ENDPOINTS.COUPONS, data);

const updateCoupon = (id, data) =>
  api.put(`${ENDPOINTS.COUPON_UPDATE}/${id}`, data);

const deleteCoupon = (id) => api.delete(`${ENDPOINTS.COUPON_DELETE}/${id}`);

export default {
  getDashboard,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
  getInventory,
  updateInventory,
  getRevenue,
  getAnalytics,
  getReviews,
  getProfile,
  updateProfile,
  getVendorProfile,
  updateVendorProfile,
  getCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
};
