import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import InputField from "../../components/Forms/InputField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import authService from "../../services/authService";
import colors from "../../constants/colors";

export default function OtpScreen({ navigation, route }) {
  const { email } = route.params;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      await authService.verifyOTP({
        email,
        otp,
      });

      navigation.replace("ResetPassword", {
        email,
        otp,
      });
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Invalid OTP"
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
          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subtitle}>
            Enter the OTP sent to
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

          <InputField
            label="OTP"
            placeholder="Enter 6 Digit OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <PrimaryButton
            title="Verify OTP"
            loading={loading}
            onPress={verifyOTP}
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
    fontSize: 16,
    color: "#666",
  },

  email: {
    marginTop: 5,
    marginBottom: 25,
    fontWeight: "700",
    color: colors.primary,
  },
});