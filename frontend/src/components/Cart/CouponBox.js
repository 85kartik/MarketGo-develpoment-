import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import api from "../../api/axios";
import ENDPOINTS from "../../api/endpoints";
import colors from "../../constants/colors";

export default function CouponBox({ reload, orderAmount }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const applyCoupon = async () => {
    if (!code.trim()) return;

    try {
      setLoading(true);
      setMessage(null);

      await api.post(ENDPOINTS.COUPON_VALIDATE, {
        code: code.trim(),
        orderAmount,
      });

      setMessage({ type: "success", text: "Coupon applied!" });
      if (reload) reload();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Invalid or expired coupon",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter coupon code"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={applyCoupon}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Apply</Text>
          )}
        </TouchableOpacity>
      </View>

      {message && (
        <Text
          style={[
            styles.message,
            message.type === "error" && styles.messageError,
          ]}
        >
          {message.text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  message: {
    marginTop: 8,
    color: colors.success,
    fontWeight: "600",
  },
  messageError: {
    color: colors.danger,
  },
});
