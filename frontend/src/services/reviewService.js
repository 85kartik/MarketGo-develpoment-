import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getProductReviews = (productId) =>
  api.get(`${ENDPOINTS.REVIEWS_BY_PRODUCT}/${productId}`);

const getAverageRating = (productId) =>
  api.get(`${ENDPOINTS.REVIEW_AVERAGE}/${productId}`);

const addReview = (data) => api.post(ENDPOINTS.REVIEW_CREATE, data);

const updateReview = (id, data) =>
  api.put(`${ENDPOINTS.REVIEW_UPDATE}/${id}`, data);

const deleteReview = (id) => api.delete(`${ENDPOINTS.REVIEW_DELETE}/${id}`);

export default {
  getProductReviews,
  getAverageRating,
  addReview,
  updateReview,
  deleteReview,
};
