import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const getHomeData = () => api.get(ENDPOINTS.HOME);

export default {
  getHomeData,
};
