import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import InputField from "../../components/Forms/InputField";
import PasswordField from "../../components/Forms/PasswordField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import colors from "../../constants/colors";
import useAuth from "../../hooks/useAuth";

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending:", form);

      const response = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      console.log("Success:", response?.data);

      Alert.alert("Success", "Registration Successful");

      navigation.navigate("Login");
    } catch (error) {
      console.log("Error:", error);
      console.log("Message:", error?.message);
      console.log("Status:", error?.response?.status);
      console.log("Response:", error?.response?.data);

      Alert.alert(
        "Registration Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
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
          <Text style={styles.title}>Create Account</Text>

          <InputField
            label="Full Name"
            placeholder="Enter Full Name"
            value={form.name}
            onChangeText={(text) => update("name", text)}
          />

          <InputField
            label="Email"
            placeholder="Enter Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => update("email", text)}
          />

          <InputField
            label="Phone Number"
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => update("phone", text)}
          />

          <PasswordField
            label="Password"
            value={form.password}
            onChangeText={(text) => update("password", text)}
          />

          <PasswordField
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) =>
              update("confirmPassword", text)
            }
          />

          <Text style={styles.roleLabel}>
            Select Account Type
          </Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                form.role === "customer" &&
                  styles.activeRole,
              ]}
              onPress={() => update("role", "customer")}
            >
              <Text
                style={[
                  styles.roleText,
                  form.role === "customer" &&
                    styles.activeText,
                ]}
              >
                Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                form.role === "vendor" &&
                  styles.activeRole,
              ]}
              onPress={() => update("role", "vendor")}
            >
              <Text
                style={[
                  styles.roleText,
                  form.role === "vendor" &&
                    styles.activeText,
                ]}
              >
                Vendor
              </Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title={loading ? "Creating..." : "Create Account"}
            loading={loading}
            onPress={handleRegister}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 25 }}
          >
            <Text style={styles.login}>
              Already have an account?
              <Text style={styles.loginNow}> Login</Text>
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
    backgroundColor: "#F3F7FC",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 25,
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
    marginBottom: 20,
  },

  roleLabel: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  roleButton: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  activeRole: {
    backgroundColor: colors.primary,
  },

  roleText: {
    color: colors.primary,
    fontWeight: "700",
  },

  activeText: {
    color: "#fff",
  },

  login: {
    textAlign: "center",
    color: "#666",
  },

  loginNow: {
    color: colors.primary,
    fontWeight: "700",
  },
});