import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getOrders = () => api.get(ENDPOINTS.MY_ORDERS);

const cancelOrder = (id) => api.put(`${ENDPOINTS.ORDER_CANCEL}/${id}`);

// NOTE: the backend does not yet expose single-order lookup, return,
// invoice, track or reorder endpoints. getOrders() returns every order
// for the logged-in user (with populated products) — filter client-side
// by _id for a "details" view until those endpoints are added.
export default {
  getOrders,
  cancelOrder,
};
