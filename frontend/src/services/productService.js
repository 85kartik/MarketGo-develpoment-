import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

// params can include { category, keyword, page, limit }
const getProducts = (params = {}) =>
  api.get(ENDPOINTS.PRODUCTS, { params });

const getProduct = (idOrSlug) =>
  api.get(`${ENDPOINTS.PRODUCT_DETAILS}/${idOrSlug}`);

export default {
  getProducts,
  getProduct,
};
