import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CartSummary({
  summary,
}) {
  return (
    <View style={styles.card}>
      <Row label="Subtotal" value={summary.subtotal} />
      <Row label="Delivery" value={summary.delivery} />
      <Row label="Discount" value={summary.discount} />
      <Row label="GST" value={summary.gst} />

      <View style={styles.divider} />

      <Row
        label="Total"
        value={summary.total}
        bold
      />
    </View>
  );
}

const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text
      style={[
        styles.text,
        bold && styles.bold,
      ]}
    >
      {label}
    </Text>

    <Text
      style={[
        styles.text,
        bold && styles.bold,
      ]}
    >
      ₹{value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  divider: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
  },

  text: {
    fontSize: 16,
  },

  bold: {
    fontWeight: "700",
    fontSize: 18,
  },
});