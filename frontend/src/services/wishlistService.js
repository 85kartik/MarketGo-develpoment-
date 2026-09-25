import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getWishlist = () => api.get(ENDPOINTS.WISHLIST);

const addToWishlist = (productId) =>
  api.post(ENDPOINTS.WISHLIST, { productId });

const removeFromWishlist = (productId) =>
  api.delete(`${ENDPOINTS.WISHLIST_REMOVE}/${productId}`);

const clearWishlist = () => api.delete(ENDPOINTS.WISHLIST_CLEAR);

const moveToCart = (productId) =>
  api.post(ENDPOINTS.WISHLIST_MOVE_TO_CART, { productId });

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
};
