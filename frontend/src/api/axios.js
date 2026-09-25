import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants/config";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("marketgo_token");

    console.log("BASE URL:", BASE_URL);
    console.log("TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("REQUEST:", config.method?.toUpperCase(), config.url);
    console.log("HEADERS:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;