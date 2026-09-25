// Central map of every backend endpoint. Paths here are relative to
// BASE_URL (which already includes /api/v1) — keep this file in sync
// with server/server.js and server/routes/*.js.
const ENDPOINTS = {
  // ---- Auth ----
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_OTP: "/auth/verify-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  PROFILE: "/auth/profile",

  // ---- Category ----
  CATEGORIES: "/category/get",
  CATEGORY_DETAILS: "/category", // + /:slug
  CATEGORY_CREATE: "/category/create",
  CATEGORY_UPDATE: "/category/update", // + /:id
  CATEGORY_DELETE: "/category/delete", // + /:id

  // ---- Product ----
  PRODUCTS: "/product",
  PRODUCT_DETAILS: "/product", // + /:idOrSlug
  PRODUCT_CREATE: "/product/create-product",
  PRODUCT_UPDATE: "/product/update", // + /:id
  PRODUCT_DELETE: "/product/delete", // + /:id

  // ---- Cart ----
  CART: "/cart/my-cart",
  CART_ADD: "/cart/add",
  CART_UPDATE: "/cart/update", // + /:id
  CART_REMOVE: "/cart/remove", // + /:id
  CART_CLEAR: "/cart/clear",

  // ---- Wishlist ----
  WISHLIST: "/wishlist",
  WISHLIST_REMOVE: "/wishlist", // + /:productId
  WISHLIST_CLEAR: "/wishlist/clear",
  WISHLIST_MOVE_TO_CART: "/wishlist/move-to-cart",

  // ---- Address ----
  ADDRESSES: "/address",
  ADDRESS_UPDATE: "/address", // + /:id
  ADDRESS_DELETE: "/address", // + /:id

  // ---- Orders ----
  ORDER_CREATE: "/order/create",
  MY_ORDERS: "/order/my-orders",
  ALL_ORDERS: "/order/all-orders",
  ORDER_STATUS: "/order/status", // + /:id
  ORDER_CANCEL: "/order/cancel", // + /:id

  // ---- Payment ----
  PAYMENT_CREATE_ORDER: "/payment/create-order",
  PAYMENT_VERIFY: "/payment/verify",

  // ---- Reviews ----
  REVIEW_CREATE: "/review/create",
  REVIEWS_BY_PRODUCT: "/review/product", // + /:productId
  REVIEW_AVERAGE: "/review/average", // + /:productId
  REVIEW_UPDATE: "/review/update", // + /:id
  REVIEW_DELETE: "/review/delete", // + /:id

  // ---- Home ----
  HOME: "/home",

  // ---- Coupons ----
  COUPONS: "/coupon",
  COUPON_VALIDATE: "/coupon/validate",
  COUPON_UPDATE: "/coupon", // + /:id
  COUPON_DELETE: "/coupon", // + /:id

  // ---- AI ----
  AI_CHAT: "/ai/chat",

  // ---- Dashboard / Analytics (admin) ----
  ADMIN_DASHBOARD: "/dashboard/admin-dashboard",
  ADMIN_ANALYTICS: "/analytics/admin-analytics",
};

export default ENDPOINTS;
