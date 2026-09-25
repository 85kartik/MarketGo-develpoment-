import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("marketgo_token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await authService.profile();

      setUser(res.data.user);

      setLoading(false);

    } catch (error) {
      await AsyncStorage.removeItem("marketgo_token");
      setLoading(false);
    }
  };

  const login = async (data) => {
  const res = await authService.login(data);

  await AsyncStorage.setItem(
    "marketgo_token",
    res.data.token
  );

  setUser(res.data.user);

  return res.data;
};

  const register = async (data) => {
    return await authService.register(data);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("marketgo_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}