import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getCart = () => api.get(ENDPOINTS.CART);

const addToCart = (data) => api.post(ENDPOINTS.CART_ADD, data);

const updateQuantity = (id, data) =>
  api.put(`${ENDPOINTS.CART_UPDATE}/${id}`, data);

const removeItem = (id) => api.delete(`${ENDPOINTS.CART_REMOVE}/${id}`);

const clearCart = () => api.delete(ENDPOINTS.CART_CLEAR);

export default {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
};
