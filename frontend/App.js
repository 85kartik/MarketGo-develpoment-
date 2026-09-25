import React from "react";
import { StatusBar } from "react-native";

import AuthProvider from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

// Registers the shared axios response interceptor (logging / error
// normalization) as a side effect of being imported once at startup.
//import "./src/api/interceptor";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </AuthProvider>
  );
}