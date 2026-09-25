import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getAdminDashboard = () => api.get(ENDPOINTS.ADMIN_DASHBOARD);

export default {
  getAdminDashboard,
};
