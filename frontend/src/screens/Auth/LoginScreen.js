import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import InputField from "../../components/Forms/InputField";
import PasswordField from "../../components/Forms/PasswordField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import colors from "../../constants/colors";
import useAuth from "../../hooks/useAuth";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const update = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending:", form);

      const res = await login(form);

      console.log("Success:", res);

      alert("Login Successful");

      // DO NOT navigate here.
      // AuthContext will update the user and App.js should switch navigators automatically.

    } catch (error) {
      console.log("Error:", error);
      console.log("Message:", error.message);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>MarketGo</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <InputField
            label="Email"
            placeholder="Enter Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(v) => update("email", v)}
          />

          <PasswordField
            label="Password"
            value={form.password}
            onChangeText={(v) => update("password", v)}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ alignSelf: "flex-end", marginBottom: 20 }}
          >
            <Text style={{ color: colors.primary }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Login"
            loading={loading}
            onPress={handleLogin}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 25 }}
          >
            <Text style={styles.register}>
              Don't have an account?
              <Text style={styles.registerNow}> Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F3F7FC",
    padding: 20,
  },

  logo: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    color: colors.primary,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
  },

  register: {
    textAlign: "center",
    color: "#666",
  },

  registerNow: {
    color: colors.primary,
    fontWeight: "700",
  },
});