import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import colors from "../../constants/colors";
import { formatPrice } from "../../utils/helpers";

export default function OrderSuccessScreen({ route, navigation }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={90} color={colors.success} />

      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully.
      </Text>

      <View style={styles.card}>
        <Row label="Order ID" value={`#${order._id.slice(-8).toUpperCase()}`} />
        <Row label="Total Amount" value={formatPrice(order.totalAmount)} />
        <Row label="Payment" value={order.paymentMethod} />
        <Row label="Status" value={order.orderStatus} />
      </View>

      <PrimaryButton
        title="View My Orders"
        onPress={() => navigation.navigate("Orders")}
        style={{ width: "100%", marginTop: 30 }}
      />

      <SecondaryButton
        title="Continue Shopping"
        onPress={() => navigation.navigate("Home")}
        style={{ width: "100%", marginTop: 14 }}
      />
    </View>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  rowLabel: {
    color: colors.textLight,
    fontSize: 14,
  },
  rowValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
});
