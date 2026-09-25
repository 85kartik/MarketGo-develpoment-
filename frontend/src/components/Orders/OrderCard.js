import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OrderStatusBadge from "./OrderStatusBadge";
import colors from "../../constants/colors";
import { getImageUrl, formatPrice, formatDate } from "../../utils/helpers";

export default function OrderCard({ order, onPress }) {
  const firstProduct = order.products?.[0]?.product;
  const extraCount = (order.products?.length || 0) - 1;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: getImageUrl(firstProduct?.photo) }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.orderId}>
          Order #{order._id.slice(-8).toUpperCase()}
        </Text>
        <Text style={styles.date}>{formatDate(order.createdAt)}</Text>

        <Text style={styles.items} numberOfLines={1}>
          {firstProduct?.name}
          {extraCount > 0 ? ` + ${extraCount} more` : ""}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.total}>{formatPrice(order.totalAmount)}</Text>
          <OrderStatusBadge status={order.orderStatus} />
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  orderId: {
    fontWeight: "700",
    color: colors.text,
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  items: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  total: {
    fontWeight: "700",
    color: colors.text,
    fontSize: 14,
  },
});
