import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const login = (data) => api.post(ENDPOINTS.LOGIN, data);

const register = (data) => api.post(ENDPOINTS.REGISTER, data);

const forgotPassword = (data) => api.post(ENDPOINTS.FORGOT_PASSWORD, data);

const verifyOTP = (data) => api.post(ENDPOINTS.VERIFY_OTP, data);

const resetPassword = (data) => api.post(ENDPOINTS.RESET_PASSWORD, data);

const profile = () => api.get(ENDPOINTS.PROFILE);

const updateProfile = (data) => api.put(ENDPOINTS.PROFILE, data);

export default {
  login,
  register,
  forgotPassword,
  verifyOTP,
  resetPassword,
  profile,
  updateProfile,
};
