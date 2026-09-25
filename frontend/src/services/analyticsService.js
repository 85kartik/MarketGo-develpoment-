import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getAdminAnalytics = () => api.get(ENDPOINTS.ADMIN_ANALYTICS);

export default {
  getAdminAnalytics,
};
