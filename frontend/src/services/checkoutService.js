import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getAddresses = () => api.get(ENDPOINTS.ADDRESSES);

const addAddress = (data) => api.post(ENDPOINTS.ADDRESSES, data);

const updateAddress = (id, data) =>
  api.put(`${ENDPOINTS.ADDRESS_UPDATE}/${id}`, data);

const deleteAddress = (id) => api.delete(`${ENDPOINTS.ADDRESS_DELETE}/${id}`);

// data: { products, totalAmount, shippingAddress, paymentMethod }
const checkout = (data) => api.post(ENDPOINTS.ORDER_CREATE, data);

// data: { amount, orderId }
const createPayment = (data) => api.post(ENDPOINTS.PAYMENT_CREATE_ORDER, data);

// data: { receiptId, orderId }
const verifyPayment = (data) => api.post(ENDPOINTS.PAYMENT_VERIFY, data);

export default {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  checkout,
  createPayment,
  verifyPayment,
};
