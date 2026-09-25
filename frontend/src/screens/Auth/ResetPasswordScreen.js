import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import PasswordField from "../../components/Forms/PasswordField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import authService from "../../services/authService";
import colors from "../../constants/colors";

export default function ResetPasswordScreen({
  navigation,
  route,
}) {
  const { email, otp } = route.params;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      console.log({
        email,
        otp,
        newPassword,
      });

      await authService.resetPassword({
        email,
        otp,
        newPassword,
      });

      Alert.alert(
        "Success",
        "Password Reset Successfully"
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          "Unable to reset password."
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
        <View style={styles.card}>
          <Text style={styles.title}>
            Create New Password
          </Text>

          <Text style={styles.subtitle}>
            Your new password must be different from your old password.
          </Text>

          <PasswordField
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <PrimaryButton
            title="Reset Password"
            loading={loading}
            onPress={handleReset}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.text,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
  },
});