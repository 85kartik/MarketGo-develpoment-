import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const chat = (message) => api.post(ENDPOINTS.AI_CHAT, { message });

export default {
  chat,
};
