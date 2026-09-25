import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getCategories = () => api.get(ENDPOINTS.CATEGORIES);

const getCategory = (slug) => api.get(`${ENDPOINTS.CATEGORY_DETAILS}/${slug}`);

export default {
  getCategories,
  getCategory,
};
