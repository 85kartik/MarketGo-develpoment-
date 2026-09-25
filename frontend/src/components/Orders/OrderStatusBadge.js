import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const STATUS_COLORS = {
  Pending: colors.warning,
  Confirmed: colors.primary,
  Shipped: "#8B5CF6",
  Delivered: colors.success,
  Cancelled: colors.danger,
};

export default function OrderStatusBadge({ status }) {
  const color = STATUS_COLORS[status] || colors.textLight;

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
