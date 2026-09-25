import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import checkoutService from "../../services/checkoutService";
import cartService from "../../services/cartService";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import colors from "../../constants/colors";
import { formatPrice } from "../../utils/helpers";

// This app's backend ships a gateway-agnostic payment stub (see
// server/controllers/paymentController.js) rather than a live gateway
// like Razorpay/Stripe. This screen creates a payment record, then lets
// the user "confirm" payment, which calls the verify endpoint. Swap the
// confirm button for a real gateway checkout UI when you wire one up.
export default function PaymentScreen({ route, navigation }) {
  const { order } = route.params;

  const [creating, setCreating] = useState(true);
  const [payment, setPayment] = useState(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    createPayment();
  }, []);

  const createPayment = async () => {
    try {
      setCreating(true);
      const res = await checkoutService.createPayment({
        amount: order.totalAmount,
        orderId: order._id,
      });
      setPayment(res.data.payment);
    } catch (err) {
      Alert.alert("Error", "Couldn't start the payment. Please try again.");
      navigation.goBack();
    } finally {
      setCreating(false);
    }
  };

  const confirmPayment = async () => {
    try {
      setConfirming(true);
      await checkoutService.verifyPayment({
        receiptId: payment.receiptId,
        orderId: order._id,
      });

      await cartService.clearCart();
      navigation.replace("OrderSuccess", { order });
    } catch (err) {
      Alert.alert("Payment failed", "Couldn't verify your payment. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  if (creating) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Setting up your payment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="card" size={56} color={colors.primary} />

        <Text style={styles.amount}>{formatPrice(order.totalAmount)}</Text>
        <Text style={styles.receipt}>Receipt: {payment?.receiptId}</Text>

        <Text style={styles.hint}>
          This is a demo payment flow. Tap below to simulate a successful
          payment and confirm your order.
        </Text>

        <PrimaryButton
          title="Confirm Payment"
          onPress={confirmPayment}
          loading={confirming}
          style={{ marginTop: 20, width: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: colors.textLight,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  amount: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    marginTop: 14,
  },
  receipt: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 6,
  },
  hint: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
});
