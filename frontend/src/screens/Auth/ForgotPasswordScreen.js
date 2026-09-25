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

import InputField from "../../components/Forms/InputField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import colors from "../../constants/colors";
import authService from "../../services/authService";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword({
        email: email.trim(),
      });

      navigation.navigate("OTP", {
        email: email.trim(),
      });

    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.subtitle}>
            Enter your registered email address.
          </Text>

          <InputField
            label="Email"
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <PrimaryButton
            title="Send OTP"
            loading={loading}
            onPress={sendOTP}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },

  subtitle: {
    color: "#666",
    marginBottom: 25,
    fontSize: 15,
  },
});